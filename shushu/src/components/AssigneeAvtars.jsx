/* eslint-disable react/prop-types */

export function AssigneeAvatars(props) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-3 items-center">
        {props.avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar.avatar_url}
            className={props.classy}
            alt="assignee img"
          />
        ))}
      </div>
    </div>
  );
}
