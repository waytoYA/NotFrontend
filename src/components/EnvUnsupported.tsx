export function EnvUnsupported() {

  return (
      <span>
        You are using too old Telegram client to run this application
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </span>
  );
}