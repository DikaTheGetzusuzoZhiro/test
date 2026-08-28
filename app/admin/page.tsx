import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminControls from "./AdminControls";

export default async function AdminPage() {
  const admin = await requireAdmin();

  if (!admin) {
    redirect("/");
  }

  const supabase = await createClient();

  const { data: resources } = await supabase
    .from("resources")
    .select(`
      *,
      profiles:owner_id (
        username,
        display_name
      )
    `)
    .order("created_at", {
      ascending: false,
    });

  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <div className="page-container">
      <div className="page-title">
        <h1>Panel Admin</h1>
        <p>Kontrol seluruh resource dan pengguna TAMAForge.</p>
      </div>

      <div className="admin-stats">
        <div>
          <strong>{users?.length || 0}</strong>
          <span>User</span>
        </div>

        <div>
          <strong>{resources?.length || 0}</strong>
          <span>Resource</span>
        </div>
      </div>

      <section className="admin-section">
        <h2>Resource</h2>

        <div className="admin-list">
          {resources?.map((resource: any) => (
            <AdminControls
              key={resource.id}
              resource={resource}
            />
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h2>User</h2>

        <div className="admin-list">
          {users?.map((user: any) => (
            <div className="admin-row" key={user.id}>
              <div>
                <strong>
                  {user.display_name || user.username}
                </strong>

                <small>
                  @{user.username} · {user.role}
                </small>
              </div>

              <span>
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString(
                      "id-ID"
                    )
                  : ""}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
