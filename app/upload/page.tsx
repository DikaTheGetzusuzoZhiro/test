"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [version, setVersion] = useState("1.0");
  const [tags, setTags] = useState("");
  const [compatibility, setCompatibility] =
    useState("SA:MP 0.3.7");

  const [file, setFile] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/auth?mode=register");
        return;
      }

      setUser(data.user);

      const { data: cats } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      setCategories(cats || []);
    }

    load();
  }, [router, supabase]);

  async function upload(e: FormEvent) {
    e.preventDefault();

    if (!user) return;
    if (!file) {
      setMessage("File resource wajib dipilih.");
      return;
    }

    if (!category) {
      setMessage("Kategori wajib dipilih.");
      return;
    }

    setLoading(true);
    setMessage("Mengupload file...");

    const safeName = file.name.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    );

    const filePath =
      `${user.id}/${crypto.randomUUID()}-${safeName}`;

    const { error: fileError } = await supabase.storage
      .from("resources")
      .upload(filePath, file);

    if (fileError) {
      setMessage(fileError.message);
      setLoading(false);
      return;
    }

    let coverUrl: string | null = null;

    if (cover) {
      const coverName = cover.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );

      const coverPath =
        `${user.id}/${crypto.randomUUID()}-${coverName}`;

      const { error: coverError } = await supabase.storage
        .from("covers")
        .upload(coverPath, cover);

      if (coverError) {
        await supabase.storage
          .from("resources")
          .remove([filePath]);

        setMessage(coverError.message);
        setLoading(false);
        return;
      }

      coverUrl = supabase.storage
        .from("covers")
        .getPublicUrl(coverPath)
        .data.publicUrl;
    }

    const { error } = await supabase
      .from("resources")
      .insert({
        title,
        description,
        category_id: category,
        version,
        tags: tags
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        compatibility: compatibility
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        file_path: filePath,
        file_name: file.name,
        file_size: file.size,
        cover_url: coverUrl,
        owner_id: user.id,   // perbaikan: owner_id
        status: "published"
      });

    if (error) {
      await supabase.storage
        .from("resources")
        .remove([filePath]);

      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="page">
      <h1>Upload Resource</h1>

      <p className="muted">
        Bagikan gamemode, filterscript, plugin, mapping,
        vehicle mod, skin pack, launcher, UCP dan resource
        lainnya.
      </p>

      <div className="form-card">
        {message && <div className="notice">{message}</div>}

        <form onSubmit={upload}>
          <label>Judul Resource</label>

          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="GM LRP Old School"
          />

          <label>Kategori</label>

          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Pilih kategori</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <label>Versi</label>

          <input
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="1.0"
          />

          <label>Deskripsi</label>

          <textarea
            required
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Jelaskan resource..."
          />

          <label>Tags</label>

          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="lrp, old school, samp"
          />

          <label>Kompatibilitas</label>

          <input
            value={compatibility}
            onChange={(e) =>
              setCompatibility(e.target.value)
            }
            placeholder="SA:MP 0.3.7, SA:MP 0.3.DL"
          />

          <label>File Resource</label>

          <input
            required
            type="file"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
          />

          {file && (
            <p className="file-name">
              File: {file.name}
            </p>
          )}

          <label>Gambar Cover / Background</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCover(e.target.files?.[0] || null)
            }
          />

          {cover && (
            <img
              className="upload-preview"
              src={URL.createObjectURL(cover)}
              alt="Preview"
            />
          )}

          <button
            className="primary"
            disabled={loading}
          >
            {loading
              ? "Mengupload..."
              : "Upload Resource"}
          </button>
        </form>
      </div>
    </main>
  );
}
