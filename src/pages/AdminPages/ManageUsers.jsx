import { useEffect, useState } from "react";
import { fetchUsers } from "../../firebase/usersProfile";
import Skeleton from "../../components/Skeleton/Skeleton";
import { formatDate } from "../../utils/formatDate";

// Read-only list of registered accounts: email and when the account was
// created. Admin-only (behind AdminRoute; Firestore rules are the real gate).
const ManageUsers = () => {
  const [state, setState] = useState({ status: "loading", users: [] });

  useEffect(() => {
    let cancelled = false;
    fetchUsers()
      .then((users) => {
        if (!cancelled) setState({ status: "ready", users });
      })
      .catch((error) => {
        console.error("Failed to load users:", error);
        if (!cancelled) setState({ status: "error", users: [] });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const { status, users } = state;

  return (
    <section className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold text-primary mb-4">
        Registered Users {status === "ready" && `(${users.length})`}
      </h2>

      {status === "loading" && (
        <div role="status" aria-busy="true" className="space-y-3">
          <span className="sr-only">Loading users...</span>
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      )}

      {status === "error" && (
        <p className="text-neutral">
          Couldn't load users. Check your connection and that the latest
          firestore.rules are published, then refresh.
        </p>
      )}

      {status === "ready" && users.length === 0 && (
        <p className="text-neutral">No registered users yet.</p>
      )}

      {status === "ready" && users.length > 0 && (
        <div className="overflow-x-auto fade-in">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-neutral">
                <th className="py-2 pr-4 font-semibold">Email</th>
                <th className="py-2 font-semibold whitespace-nowrap">
                  Account created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-3 pr-4 text-primary break-all">
                    {user.email}
                  </td>
                  <td className="py-3 text-neutral whitespace-nowrap">
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ManageUsers;
