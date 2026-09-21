import CarListingCard from "./CarListingCard";

// The listing grid for the Used / New Cars pages: 1 column on mobile, 2 on
// tablet, 3 on small desktops (beside the sidebar) and 4 on large desktops.
const CarGrid = ({ cars }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-6">
      {cars.map((car) => (
        <li key={car.id} className="fade-in">
          <CarListingCard car={car} />
        </li>
      ))}
    </ul>
  );
};

export default CarGrid;
