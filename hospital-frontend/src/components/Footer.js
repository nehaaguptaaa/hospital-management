function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1976d2",
        padding: "12px",
        textAlign: "center",
        color: "white",
        marginTop: "40px",
      }}
    >
      <p>
        © {new Date().getFullYear()} Hospital Management System — All Rights
        Reserved
      </p>
    </footer>
  );
}

export default Footer;
