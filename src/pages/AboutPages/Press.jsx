import { PRESS_CONTENT } from "../../data/teamData";
// import { useState } from "react";   // COMMENTED OUT: only the news card used it

// COMMENTED OUT: the news card for the placeholder press articles (invented
// outlets, dates and stories). Kept so it's easy to reinstate for real items.
// // Pure presentational component for news card
// const NewsCard = ({ item, onReadMore }) => {
//   const [imageError, setImageError] = useState(false);
//
//   const handleImageError = () => {
//     console.error(`Failed to load image for news item: ${item.id}`);
//     setImageError(true);
//   };
//
//   const handleClick = (e) => {
//     e.preventDefault();
//     console.log(`Navigate to: ${item.link}`);
//     if (onReadMore) onReadMore(item);
//   };
//
//   return (
//     <article
//       className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
//       onClick={handleClick}
//     >
//       {/* Image Area */}
//       <div className="h-48 overflow-hidden bg-neutral-light">
//         {imageError ? (
//           <div className="w-full h-full flex items-center justify-center bg-neutral-light text-neutral">
//             <span className="text-sm">Image unavailable</span>
//           </div>
//         ) : (
//           <img
//             src={item.image}
//             alt={item.imageAlt}
//             className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//             onError={handleImageError}
//             loading="lazy"
//           />
//         )}
//       </div>
//
//       {/* Text Area */}
//       <div className="p-6 space-y-3">
//         <div className="flex items-center justify-between text-sm text-neutral">
//           <span className="font-semibold text-accent">{item.source}</span>
//           <time dateTime={item.date}>{item.displayDate}</time>
//         </div>
//
//         <h3 className="text-xl font-bold text-primary line-clamp-2">
//           {item.title}
//         </h3>
//
//         <p className="text-neutral leading-relaxed line-clamp-2">
//           {item.excerpt}
//         </p>
//
//         <button
//           className="text-accent font-semibold hover:underline flex items-center gap-2 group"
//           aria-label={`Read more about ${item.title}`}
//         >
//           Read More
//           <span
//             className="group-hover:translate-x-1 transition-transform"
//             aria-hidden="true"
//           >
//             →
//           </span>
//         </button>
//       </div>
//     </article>
//   );
// };

// Main Press component. There's no real press coverage yet, so it shows a clean
// empty state; the original page (news grid, "view all" button and media
// inquiries block) is commented out below rather than deleted.
const Press = () => {
  // COMMENTED OUT: the original component signature and handlers.
  // // Main Press component
  // const Press = ({
  //   newsItems = PRESS_CONTENT.newsItems,
  //   onReadMore,
  //   onViewAll,
  //   onMediaKitDownload,
  // }) => {
  //   const handleViewAll = () => {
  //     console.log(`Navigate to: ${PRESS_CONTENT.viewAllButton.link}`);
  //     if (onViewAll) onViewAll();
  //   };
  //
  //   const handleMediaKitDownload = () => {
  //     console.log(
  //       `Download media kit: ${PRESS_CONTENT.mediaContact.mediaKitUrl}`,
  //     );
  //     if (onMediaKitDownload) onMediaKitDownload();
  //   };
  //
  //   const handleEmailClick = () => {
  //     window.location.href = `mailto:${PRESS_CONTENT.mediaContact.email}`;
  //   };

  return (
    <div className="space-y-16">
      {/* Header Section */}
      <header className="text-center space-y-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">
          {PRESS_CONTENT.header.title}
        </h2>
        <p className="text-xl text-neutral max-w-2xl mx-auto">
          {PRESS_CONTENT.header.subtitle}
        </p>
      </header>

      {/* Empty state: the same look as the Reviews page's empty states */}
      <p className="rounded-2xl bg-white p-8 text-center text-lg text-neutral shadow-lg">
        No press coverage yet — check back soon.
      </p>

      {/* COMMENTED OUT: the news grid, the "View All Press Releases" button and
          the "Media Inquiries" block (fake press@carwise.com address and a media
          kit that doesn't exist). Reinstate once there's real coverage. */}
      {
        //       {/* News Grid */}
        //       <section
        //         className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        //         aria-label="Recent press releases"
        //       >
        //         {newsItems.map((item) => (
        //           <NewsCard key={item.id} item={item} onReadMore={onReadMore} />
        //         ))}
        //       </section>
      }
      {
        //       {/* All Press Releases Button */}
        //       <div className="text-center mt-12">
        //         <button
        //           onClick={handleViewAll}
        //           className="px-8 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all transform hover:scale-105"
        //         >
        //           {PRESS_CONTENT.viewAllButton.text}
        //         </button>
        //       </div>
      }
      {
        //       {/* Media Contact Section */}
        //       <aside className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 sm:p-12 text-white text-center mt-16">
        //         <h2 className="text-3xl font-bold mb-4">
        //           {PRESS_CONTENT.mediaContact.title}
        //         </h2>
        //         <p className="text-lg text-neutral-light mb-6 max-w-2xl mx-auto">
        //           {PRESS_CONTENT.mediaContact.description}
        //         </p>
        //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
        //           <button
        //             onClick={handleEmailClick}
        //             className="px-8 py-4 bg-accent hover:bg-accent-light text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg"
        //           >
        //             {PRESS_CONTENT.mediaContact.email}
        //           </button>
        //           <button
        //             onClick={handleMediaKitDownload}
        //             className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:scale-105 transition-transform shadow-lg"
        //           >
        //             Download Media Kit
        //           </button>
        //         </div>
        //       </aside>
      }
    </div>
  );
};

export default Press;
