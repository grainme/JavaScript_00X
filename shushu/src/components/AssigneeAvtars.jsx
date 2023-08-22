/* eslint-disable react/prop-types */

export function AssigneeAvatars(props) {
  const { avatars, classy } = props;

  const maxVisibleAvatars = 3;
  const remainingAvatars = Math.max(avatars.length - maxVisibleAvatars, 0);

  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-2 items-center">
        {avatars.slice(0, maxVisibleAvatars).map((avatar, index) => (
          <img
            key={index}
            src={avatar.avatar_url}
            className={classy}
            alt="assignee img"
          />
        ))}
        {remainingAvatars > 0 && (
          <div
            className={`w-10 h-10 rounded-full bg-red-100 border-red-200 text-red-500 flex items-center justify-center ${classy}`}
          >
            +{remainingAvatars}
          </div>
        )}
      </div>
    </div>
  );
}
