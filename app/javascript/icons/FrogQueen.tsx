import { SvgIcon, type SvgIconProps } from "@mui/material";

export const Crown = (props: SvgIconProps) => {
  const { sx } = props;

  return (
    <SvgIcon
      width="400px"
      height="400px"
      {...props}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
      sx={{ ...sx, fill: "none" }}
    >
      <title>Frog Doodle</title>
      <script>
        {/* eslint-disable react/jsx-no-comment-textnodes */}
        /* Adapted from: Crown SVG Vector, by vectordoodle, Creative Commons
        Licence, https://www.svgrepo.com/svg/452683/crown */
        {/* eslint-enable react/jsx-no-comment-textnodes */}
      </script>
      <path d="M122 256.491C128.401 255.021 135.689 155.505 137.425 155.505C139.513 155.505 140.235 168.803 140.51 169.935C143.226 181.226 149.779 194.176 159.019 198.786C170.207 204.365 189.929 164.92 192.955 154.546C193.035 154.272 195.726 141.143 196.812 142.044C207.535 150.959 203.525 211.324 240.773 205.519C263.127 202.036 272.621 146.033 277.023 148.777C278.608 149.763 275.536 174.171 275.481 175.704C274.467 203.538 277.792 230.818 277.792 258.414C233.368 252.531 187.86 249.709 144.104 258.414" />
    </SvgIcon>
  );
};

export const FrogQueen = (props: SvgIconProps) => {
  const { sx } = props;

  return (
    <SvgIcon
      width="400px"
      height="400px"
      {...props}
      viewBox="0 -35 400 365"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
      sx={{ ...sx, fill: "none" }}
    >
      <title>Frog Doodle</title>
      <script>
        {/* eslint-disable react/jsx-no-comment-textnodes */}
        /* Adapted from: Frog SVG Vector, by vectordoodle, Creative Commons
        Licence, https://www.svgrepo.com/svg/452895/frog */
        {/* eslint-enable react/jsx-no-comment-textnodes */}
      </script>
      <path d="M140.126 298C126.478 278.853 54.833 167.153 70.1301 153.966C112.157 117.747 160.987 233.547 169 254.261" />
      <path d="M231 268.972C243.441 246.461 259.817 226.683 274.612 205.819C278.22 200.734 320.083 138.326 322.768 139.006C343.317 144.18 326.022 199.098 305.37 238.087C284.718 277.076 251.134 295.672 251.805 297.023C255.377 304.223 287.8 289.396 292.786 290.026" />
      <path d="M259 298C266.518 299.647 276.168 308.608 279 310" />
      <path d="M254 299C255.514 302.597 255.482 306.329 256 310" />
      <path d="M151 309C145.734 312.243 119.294 310.792 114 314" />
      <path d="M142 314C140.604 316.008 141.333 318.665 141 321" />
      <path d="M142 300C144.572 305.007 147.155 307.391 151 310" />
      <path d="M118 161.604C168.8 81.3012 290 44.8316 290 181" />
      <path d="M186 87.9739C175.016 73.6925 165.556 87.8316 164 101" />
      <path d="M256 80.8324C269.395 72.3387 274.059 84.7859 272.804 94" />
      <path d="M259 141C238.262 134.454 210.707 135.187 188 138.362" />
      <Crown width="300px" height="300px" x="70px" y="-140px" />
    </SvgIcon>
  );
};

export default FrogQueen;
