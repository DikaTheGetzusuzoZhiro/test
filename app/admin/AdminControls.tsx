"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminControls({
  resource,
}: {
  resource: any;
}) {
  const supabase = createClient();
  const router = useRouter();

  const [status, setStatus] = useState(resource.status);
  const [loading, setLoading] = useState(false);

  async function updateStatus(
    newStatus: "published" | "pending" | "rejected"
  ) {
    setLoading(true);

    const { error } = await supabase
      .from("resources")
      .update({
        status: newStatus,
      })
      .eq("id", resource.id);

    if (!error) {
      setStatus(newStatus);
    }

    setLoading(false);
  }

  async function deleteResource() {
    const confirmDelete = confirm(
      `Hapus resource "${resource.title}"?`
    );

    if (!confirmDelete) return;

    setLoading(true);

    const { error } = await supabase
      .from("resources")
      .delete()
      .eq("id", resource.id);

    if (!error) {
      router.refresh(); // refresh data tanpa reload penuh
    }

    setLoading(false);
  }

  return (
    <div className="admin-row">
      <div>
        <strong>{resource.title}</strong>

        <small>
          {resource.category || "Tanpa kategori"}
        </small>
      </div>

      <div className="admin-actions">
        <select
          value={status}
          onChange={(e) =>
            updateStatus(e.target.value as any)
          }
          disabled={loading}
        >
          <option value="published">Published</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>

        <button
          className="danger-btn"
          onClick={deleteResource}
          disabled={loading}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
