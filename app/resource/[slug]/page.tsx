import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: resource } = await supabase
    .from("resources")
    .select(`
      *,
      profiles:owner_id (
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!resource) {
    notFound();
  }

  const { data: reviews } = await supabase
    .from("reviews")
    .select(`
      *,
      profiles:user_id (
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("resource_id", resource.id)
    .order("created_at", {
      ascending: false,
    });

  return (
    <div className="resource-page">
      <section className="resource-hero">
        {resource.cover_url && (
          <img
            src={resource.cover_url}
            alt={resource.title}
            className="resource-cover"
          />
        )}

        <div className="resource-info">
          <span className="category-badge">
            {resource.category || "Resource"}
          </span>

          <h1>{resource.title}</h1>

          <div className="resource-author">
            {resource.profiles?.avatar_url && (
              <img
                src={resource.profiles.avatar_url}
                alt=""
              />
            )}

            <strong>
              {resource.profiles?.display_name ||
                resource.profiles?.username}
            </strong>

            <span>·</span>

            <span>
              {resource.downloads || 0} download
            </span>
          </div>

          <a
            href={resource.file_url}
            className="download-button"
          >
            ↓ Download
          </a>
        </div>
      </section>

      <div className="resource-content">
        <section className="resource-description">
          <h2>Deskripsi</h2>

          <div className="description-box">
            {resource.description || "Tidak ada deskripsi."}
          </div>
        </section>

        <section className="resource-info-card">
          <h2>Resource Info</h2>

          <div className="info-row">
            <span>Last Update</span>
            <strong>
              {new Date(
                resource.updated_at
              ).toLocaleDateString("id-ID")}
            </strong>
          </div>

          <div className="info-row">
            <span>Diunggah</span>
            <strong>
              {new Date(
                resource.created_at
              ).toLocaleDateString("id-ID")}
            </strong>
          </div>

          <div className="info-row">
            <span>Downloads</span>
            <strong>{resource.downloads || 0}</strong>
          </div>

          <div className="info-row">
            <span>Versi</span>
            <strong>{resource.version || "1.0"}</strong>
          </div>

          <div className="info-row">
            <span>Kompatibilitas</span>
            <strong>
              {resource.compatibility || "SA:MP / open.mp"}
            </strong>
          </div>
        </section>

        <section className="reviews">
          <h2>Review</h2>

          {reviews?.length ? (
            reviews.map((review: any) => (
              <div className="review-card" key={review.id}>
                <strong>
                  {review.profiles?.display_name ||
                    review.profiles?.username}
                </strong>

                <div>
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>

                <p>{review.content}</p>
              </div>
            ))
          ) : (
            <p>Belum ada review.</p>
          )}
        </section>
      </div>
    </div>
  );
}
