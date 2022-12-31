import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
export default function CustomSeparator() {
  const breadcrumbs = [
    <Link
      color="#12499C"
      key="1"
      href="/"
      underline="none"
      style={{ fontWeight: "525" }}
      onClick={handleClick}
    >
      Home
    </Link>,
    <Link
      underline="none"
      key="2"
      color="#12499C"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      Administration
    </Link>,
    <Typography key="3" color="inherit">
      Logger search
    </Typography>,
  ];

  return (
    <Breadcrumbs
      separator="›"
      style={{ marginTop: "-10px", marginLeft: "10px", marginBottom: "10px", width: "100%"}}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}
