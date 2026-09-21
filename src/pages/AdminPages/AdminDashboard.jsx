import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CarFront, Clock, Heart, Pencil, Star, Users } from "lucide-react";
import { fetchAllCars, toUrlList } from "../../firebase/carsAdmin";
import { countUsers } from "../../firebase/usersProfile";
import { fetchWishlistCounts } from "../../firebase/wishlistStats";
import {
  STATUSES,
  computeCarStats,
  mostWishlisted,
  recentCars,
} from "../../utils/carStats";
import { formatDate } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import Skeleton from "../../components/Skeleton/Skeleton";

const STATUS_STYLES = {
  available: { label: "Available", dot: "bg-green-500" },
  reserved: { label: "Reserved", dot: "bg-accent" },
  sold: { label: "Sold", dot: "bg-neutral" },
  other: { label: "Other", dot: "bg-red-400" },
};

const editLink = (car) => `/admin/cars?edit=${encodeURIComponent(car.id)}`;

const Card = ({ className = "", children }) => (
  <section className={`min-w-0 bg-white rounded-2xl shadow p-4 sm:p-6 ${className}`}>
    {children}
  </section>
);

// `icon` is a lucide icon element, sized here.
const IconChip = ({ icon, className }) => (
  <span
    aria-hidden="true"
    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl [&>svg]:h-6 [&>svg]:w-6 ${className}`}
  >
    {icon}
  </span>
);

// A single headline number.
const StatTile = ({ icon, chipClass, label, value, note }) => (
  <Card className="flex items-center gap-4">
    <IconChip icon={icon} className={chipClass} />
    <div className="min-w-0">
      <p className="text-sm font-semibold text-neutral">{label}</p>
      <p className="text-4xl font-bold leading-tight text-primary">{value}</p>
      {note && <p className="text-sm text-neutral">{note}</p>}
    </div>
  </Card>
);

const Unavailable = ({ children }) => (
  <p className="text-sm text-neutral">{children}</p>
);

// Total cars, with the Used / New x status breakdown underneath.
const InventoryCard = ({ stats }) => {
  const { byTypeStatus, byStatus } = stats;
  const rows = [
    { key: "used", label: "Used" },
    { key: "new", label: "New" },
    ...(byTypeStatus.other.total > 0 ? [{ key: "other", label: "Other" }] : []),
  ];
  const columns = [
    ...STATUSES,
    ...(byStatus.other > 0 ? ["other"] : []),
  ];

  return (
    <Card className="md:col-span-2">
      <div className="flex items-center gap-4">
        <IconChip icon={<CarFront />} className="bg-primary text-white" />
        <div>
          <p className="text-sm font-semibold text-neutral">Total cars</p>
          <p className="text-4xl font-bold leading-tight text-primary">
            {stats.total}
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-neutral">
              <th className="py-2 pr-2 sm:pr-3 font-semibold">
                <span className="sr-only">Type</span>
              </th>
              {columns.map((status) => (
                <th key={status} className="px-1.5 sm:px-2 py-2 text-right font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`hidden h-2.5 w-2.5 rounded-full sm:inline-block ${STATUS_STYLES[status].dot}`}
                      aria-hidden="true"
                    />
                    {STATUS_STYLES[status].label}
                  </span>
                </th>
              ))}
              <th className="pl-2 py-2 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-primary">
            {rows.map(({ key, label }) => (
              <tr key={key}>
                <th scope="row" className="py-2 pr-3 font-semibold">
                  {label}
                </th>
                {columns.map((status) => (
                  <td key={status} className="px-1.5 sm:px-2 py-2 text-right tabular-nums">
                    {byTypeStatus[key][status]}
                  </td>
                ))}
                <td className="pl-2 py-2 text-right font-bold tabular-nums">
                  {byTypeStatus[key].total}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200 font-bold text-primary">
              <th scope="row" className="py-2 pr-2 sm:pr-3 whitespace-nowrap">
                All cars
              </th>
              {columns.map((status) => (
                <td key={status} className="px-1.5 sm:px-2 py-2 text-right tabular-nums">
                  {byStatus[status]}
                </td>
              ))}
              <td className="pl-2 py-2 text-right tabular-nums">
                {byStatus.total}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
};

const Thumbnail = ({ car }) => {
  const photo = toUrlList(car.imageUrls)[0];
  return photo ? (
    <img
      src={photo}
      alt=""
      className="h-12 w-18 shrink-0 rounded-lg object-cover"
    />
  ) : (
    <div className="flex h-12 w-18 shrink-0 items-center justify-center rounded-lg bg-neutral-light text-xs text-neutral">
      No photo
    </div>
  );
};

// One clickable row that opens the car's Edit form in Manage Cars.
const CarRow = ({ car, lead, trailing }) => (
  <li>
    <Link
      to={editLink(car)}
      className="flex items-center gap-3 rounded-lg px-2 py-2.5 -mx-2 hover:bg-neutral-light"
    >
      {lead}
      <Thumbnail car={car} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-primary">{car.name}</p>
        <p className="truncate text-sm text-neutral">
          {[car.year, formatPrice(car.price), car.type, car.status]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
      {trailing}
    </Link>
  </li>
);

const RecentCarsCard = ({ cars }) => (
  <Card>
    <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-primary">
      <Clock className="h-5 w-5 text-accent-dark" aria-hidden="true" />
      Recently added
    </h2>
    {cars.length === 0 ? (
      <Unavailable>No cars yet.</Unavailable>
    ) : (
      <ul className="divide-y divide-gray-100">
        {cars.map((car) => (
          <CarRow
            key={car.id}
            car={car}
            trailing={
              <span className="flex shrink-0 flex-col items-end gap-1 text-xs text-neutral">
                <span>{formatDate(car.createdAt?.toDate?.() ?? null)}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary-light">
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  Edit
                </span>
              </span>
            }
          />
        ))}
      </ul>
    )}
  </Card>
);

const MostWishlistedCard = ({ ranked, error }) => (
  <Card>
    <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-primary">
      <Heart className="h-5 w-5 text-secondary" aria-hidden="true" />
      Most wishlisted
    </h2>
    {error ? (
      <Unavailable>
        Couldn't load wishlist counts. Check that the latest firestore.rules
        are published, then refresh.
      </Unavailable>
    ) : ranked.length === 0 ? (
      <Unavailable>No cars have been saved to a wishlist yet.</Unavailable>
    ) : (
      <ul className="divide-y divide-gray-100">
        {ranked.map(({ car, saves }, index) => (
          <CarRow
            key={car.id}
            car={car}
            lead={
              <span className="w-5 shrink-0 text-center text-lg font-bold text-neutral">
                {index + 1}
              </span>
            }
            trailing={
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-secondary-dark">
                <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
                {saves}
                <span className="sr-only"> {saves === 1 ? "save" : "saves"}</span>
              </span>
            }
          />
        ))}
      </ul>
    )}
  </Card>
);

const DashboardSkeleton = () => (
  <div role="status" aria-busy="true" className="space-y-6">
    <span className="sr-only">Loading dashboard...</span>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Skeleton className="h-64 rounded-2xl md:col-span-2" />
      <Skeleton className="h-28 rounded-2xl" />
      <Skeleton className="h-28 rounded-2xl" />
    </div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Skeleton className="h-96 rounded-2xl" />
      <Skeleton className="h-96 rounded-2xl" />
    </div>
  </div>
);

// Admin-only (behind AdminRoute; Firestore rules are the real gate). Every
// figure is read live from Firestore each time the page opens.
const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled([
      fetchAllCars(),
      fetchWishlistCounts(),
      countUsers(),
    ]).then(([cars, wishlist, users]) => {
      for (const result of [cars, wishlist, users]) {
        if (result.status === "rejected") {
          console.error("Dashboard data failed to load:", result.reason);
        }
      }
      if (!cancelled) setData({ cars, wishlist, users });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) return <DashboardSkeleton />;

  if (data.cars.status === "rejected") {
    return (
      <Card>
        <p className="text-neutral">
          Couldn't load the dashboard. Check your connection and the Firebase
          rules, then refresh.
        </p>
      </Card>
    );
  }

  const cars = data.cars.value;
  const stats = computeCarStats(cars);
  const wishlistFailed = data.wishlist.status === "rejected";
  const ranked = wishlistFailed
    ? []
    : mostWishlisted(cars, data.wishlist.value, 5);

  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InventoryCard stats={stats} />
        <StatTile
          icon={<Star />}
          chipClass="bg-accent/15 text-accent-dark"
          label="Dealer's Choice"
          value={stats.dealerChoice}
          note={`${stats.dealerChoiceLive} showing on the Home page`}
        />
        <StatTile
          icon={<Users />}
          chipClass="bg-primary-light/20 text-primary"
          label="Registered users"
          value={data.users.status === "fulfilled" ? data.users.value : "—"}
          note={
            data.users.status === "fulfilled" ? null : "Couldn't be loaded"
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentCarsCard cars={recentCars(cars, 5)} />
        <MostWishlistedCard ranked={ranked} error={wishlistFailed} />
      </div>
    </div>
  );
};

export default AdminDashboard;
