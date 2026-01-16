// Team.jsx - Component file
import React from "react";
import { TEAM_CONTENT } from "../../data/teamData";

// Pure presentational component for team member card
const LeaderCard = ({ leader, onViewProfile }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    console.error(`Failed to load image for team member: ${leader.id}`);
    setImageError(true);
  };

  const handleClick = () => {
    console.log(`View profile for: ${leader.name}`);
    if (onViewProfile) onViewProfile(leader);
  };

  return (
    <article
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden bg-neutral-light">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-neutral-light text-neutral">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">
                  {leader.name.charAt(0)}
                </span>
              </div>
              <p className="text-sm">Photo unavailable</p>
            </div>
          </div>
        ) : (
          <img
            src={leader.image}
            alt={leader.imageAlt}
            className="w-full h-full p-3 rounded-3xl object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="inline-block bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 border border-white/30 shadow-lg">
            <h3 className="text-xl font-bold text-white drop-shadow-lg leading-tight">
              {leader.name}
            </h3>
            <p className="text-sm text-accent font-bold drop-shadow-md">
              {leader.position}
            </p>
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="p-6">
        <p className="text-neutral leading-relaxed">{leader.description}</p>
      </div>
    </article>
  );
};

// Main Team component
const Team = ({
  leaders = TEAM_CONTENT.leadership.members,
  onViewProfile,
  onJoinTeam,
}) => {
  const handleJoinTeam = () => {
    console.log(`Navigate to: ${TEAM_CONTENT.joinTeam.buttonLink}`);
    if (onJoinTeam) {
      onJoinTeam();
    } else {
      // Default navigation logic
      window.location.href = TEAM_CONTENT.joinTeam.buttonLink;
    }
  };

  return (
    <div className="space-y-16">
      {/* Header Section */}
      <header className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-primary">
          {TEAM_CONTENT.header.title}
        </h1>
        <p className="text-xl text-neutral max-w-2xl mx-auto">
          {TEAM_CONTENT.header.subtitle}
        </p>
      </header>

      {/* Leadership Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-primary mb-3">
            {TEAM_CONTENT.leadership.heading}
          </h2>
          <div
            className="w-24 h-1 bg-accent mx-auto rounded-full"
            aria-hidden="true"
          ></div>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          role="list"
        >
          {leaders.map((leader) => (
            <LeaderCard
              key={leader.id}
              leader={leader}
              onViewProfile={onViewProfile}
            />
          ))}
        </div>
      </section>

      {/* Join Team CTA */}
      <aside className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-12 text-center text-white mt-16">
        <h2 className="text-3xl font-bold mb-4">
          {TEAM_CONTENT.joinTeam.title}
        </h2>
        <p className="text-lg text-neutral-light mb-6 max-w-2xl mx-auto">
          {TEAM_CONTENT.joinTeam.description}
        </p>
        <button
          onClick={handleJoinTeam}
          className="px-8 py-4 bg-accent hover:bg-accent-light text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg"
        >
          {TEAM_CONTENT.joinTeam.buttonText}
        </button>
      </aside>
    </div>
  );
};

export default Team;
