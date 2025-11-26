export const WelcomeStep = () => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        width: "100%",
        textAlign: "center",
      }}
    >
      <img
        src="/undraw_pair-programming_9jyg.svg"
        alt="welcome"
        style={{
          maxWidth: "300px",
          width: "100%",
          height: "auto",
        }}
      />

      <h1 style={{ marginTop: "12px", fontSize: "1.4rem" }}>
        به دنیای چالش bcpc خوش آمدید!
      </h1>
      <h1 style={{ marginTop: "12px", fontSize: "1rem", color: "#636161ff" }}>
        برای ساخت تیم و ثبت نام از اینجا شروع کنید
      </h1>
    </div>
  );
};
