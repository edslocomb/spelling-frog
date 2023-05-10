import * as React from "react";
import { SvgIcon, type SvgIconProps } from "@mui/material";

export const Frog = (props: SvgIconProps) => {
  const { sx } = props;

  return (
    <SvgIcon
      width="400px"
      height="400px"
      {...props}
      viewBox="100 50 500 450"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      sx={sx}
    >
      <script>
        {/* eslint-disable react/jsx-no-comment-textnodes */}
        /* Adapted from: Frog, by Saeful Muslim, CCBY3.0
        https://thenounproject.com/icon/frog-1132903/ */
        {/* eslint-enable react/jsx-no-comment-textnodes */}
      </script>
      <path
        d="m496.83 85.094c3.2812 1.2148 6.3945 2.7656 9.3281 4.6602 2.7734 1.8984 5.4492 4.1367 8.043 6.7422l2.0703 1.5508 1.8203 2.0781 5.4492 8.2891 0.25781 0.53125h0.25391v0.23438l0.26172 0.28125 3.1094 1.5508 11.672 3.3594c3.1133 0.875 7.9531 2.0039 14.52 3.375l1.0352 0.28125 12.441 4.3789c5.5391 1.9336 11.496 4.6758 17.891 8.3164 4.1484 2.582 6.1367 4.2344 5.9648 4.9102-0.51562 0.86719-3.1133 0.86719-7.7773 0-7.2617-1.7031-13.57-3.1016-18.93-4.1328l-11.145-2.8672h-1.3008c-7.7656-0.86328-13.047-1.6406-15.809-2.3281l-15.559-4.1445c-1.2109-0.69922-1.9883-1.1328-2.3359-1.3008l-2.3359-1.5508-2.0703-2.0664-7-9.8555-1.8203-1.5586c-3.625-3.8086-7.8633-6.6523-12.699-8.5508-4.8398-1.8867-9.418-2.6836-13.742-2.3359-4.3164 0.16797-8.293 1.3906-11.93 3.625-3.2891 1.9102-6.0469 4.5039-8.293 7.7891-2.7656 3.8008-5.0117 9.2383-6.7422 16.328-0.69531 3.1133-1.2109 4.7617-1.5508 4.9336-0.35156 1.1914-0.69531 1.8828-1.043 2.0664-0.51953 0-1.043-0.59375-1.5508-1.8203-0.52734-1.3672-0.86719-3.2891-1.043-5.6992l-6.7422 1.5625c-12.273 2.7656-24.891 6.2227-37.852 10.371-12.789 4.1328-30.934 10.875-54.449 20.215-15.551 5.8789-26.359 9.9219-32.406 12.18-15.559 5.0195-27.223 8.9883-35 11.922-13.48 5.1914-24.367 10.297-32.664 15.305-3.8008 2.2461-8.293 5.3594-13.484 9.3125-3.2812 2.7773-7 6.5898-11.145 11.434-6.2266 6.9062-12.27 15.031-18.148 24.355-6.5703 10.719-11.324 18.508-14.258 23.34l-12.707 18.934c-2.9336 3.6172-4.8438 6.0547-5.707 7.2578-2.0664 2.4258-3.8906 4.3945-5.4375 5.9531l-8.293 7.5195c1.5586 0.6875 3.1094 1.3789 4.6641 2.0781 2.2461 1.2227 4.6641 2.6719 7.2617 4.418l7 4.6602c4.6641 3.1016 8.8125 5.9648 12.441 8.5625 7.5977 5.6992 14.605 11.562 21 17.617 6.4023 5.8672 11.754 11.492 16.078 16.844 4.3164 5.5312 7.5195 10.289 9.5859 14.258 1.9023 3.8125 3.2891 7.1719 4.1484 10.113 0.85547 2.418 0.95312 3.7305 0.25391 3.9102-0.33984 0.16406-1.2891-0.69922-2.8438-2.5938-2.2461-3.2891-4.2344-6.2383-5.9648-8.832-2.4258-3.1133-6.1367-7.1641-11.148-12.195-4.3242-4.4922-9.6836-9.2344-16.07-14.258-5.707-4.6641-12.879-9.8438-21.516-15.539l-25.93-15.82c-5.875-2.7422-10.723-4.7617-14.516-5.9531-5.7109-1.9023-10.633-2.7773-14.785-2.5938-2.5938 0.35156-4.5742 0.85547-5.957 1.5352-1.3828 1.0547-2.4141 2.3398-3.1133 3.8984-1.5586 3.6406-1.8984 8.5625-1.0352 14.789 0.34766 3.4648 1.3906 9.3281 3.1133 17.617l4.6641 17.375c3.1133 11.426 6.7422 21.957 10.891 31.629 2.2461 5.5312 4.4922 9.9219 6.7422 13.211l2.0703 2.5977c0.34766 0.53906 0.95312 1.2031 1.8125 2.0664 0.34766 0.53906 1.2109 1.2383 2.5859 2.1016l2.3398 1.7852c5.1797 2.957 13.223 5.9766 24.113 9.0898 3.8008 1.0547 10.969 2.8438 21.508 5.4492 3.1211 0.67578 5.8789 1.3789 8.3008 2.0664-6.0469-6.3828-11.844-13.547-17.371-21.516-3.2812-4.6758-7.6953-11.418-13.223-20.227l-18.148-29.82c-2.7734-4.3164-4.4062-6.9883-4.9219-8.0352-0.86719-1.8867-1.2109-3.0195-1.043-3.3555 0.34766-0.17969 1.3906 0.42188 3.1211 1.7969 2.0703 1.5508 4.4023 3.7188 6.9961 6.4844 5.0195 5.3633 12.359 14.52 22.035 27.484 6.9141 9.3359 11.672 15.727 14.258 19.191 5.8789 7.5898 11.762 14.258 17.633 19.965 4.4922 4.3125 8.043 7.4102 10.629 9.3281 3.8008 2.9219 7.7734 5.2656 11.922 6.9883 8.9805 4.1562 18.234 5.0195 27.746 2.5938 9.3281-2.4141 15.547-8.0352 18.664-16.855 1.3789-4.1445 2.0781-8.5469 2.0781-13.223v-6.7305c-0.51953-3.8125-0.86719-6.125-1.043-7.0117-1.0352-7.7773-3.3672-16.133-7-25.133-2.9336-6.9062-6.4805-13.742-10.629-20.484-3.2773-5.5234-7-10.641-11.148-15.305-2.9297-3.2812-6.4727-6.6484-10.625-10.102-1.8984-1.3906-4.3242-3.0352-7.2617-4.9219-1.8984-1.0469-2.8438-1.8203-2.8438-2.3359 0-0.53125 1.3008-0.53125 3.8867 0 2.7656 0.33594 5.8789 1.3906 9.3281 3.1016 4.8438 2.5977 9.0781 5.6211 12.711 9.0781 4.6641 3.9883 9.3281 8.9922 13.996 15.047 4.6719 6.4023 8.9023 13.652 12.707 21.777 1.5586 3.4609 3.0312 7.0039 4.4062 10.629 8.6406 0.5 15.473 0.42188 20.473-0.25781 3.9805-0.17188 8.3906-0.94531 13.227-2.3477 4.1484-1.1875 8.5508-2.9297 13.215-5.1875 3.8086-1.8945 7.7773-4.5742 11.934-8.0352 2.0703-1.5586 5.5312-4.6641 10.367-9.3242 5.3594-5.2031 9.5938-9.25 12.711-12.188 0.34766-2.6055 0.86328-5.5312 1.5586-8.832 1.7305-6.5469 3.9688-13.816 6.7383-21.766l6.4805-18.145c4.4961-11.574 7.5195-20.312 9.0781-26.203 1.043-3.6172 1.8125-6.043 2.3359-7.2539 0.6875-1.7266 1.2109-2.5078 1.5508-2.3359 0.34766 0 0.69922 0.86719 1.043 2.5938 0.34766 2.7734 0.42969 5.3438 0.25781 7.7773-0.34766 7.2617-1.9805 16.676-4.9219 28.273l-5.1875 18.664c-2.2461 8.1211-3.9766 15.211-5.1914 21.258-1.7266 9.1562-2.4961 16.832-2.3281 23.07 0.17969 4.9961 0.60547 8.8945 1.293 11.664l3.1133 12.438c2.9414 11.066 5.707 18.934 8.3008 23.621 3.625 7.4102 8.1211 11.82 13.48 13.184 2.4258 0.89453 5.4492 1.1406 9.0781 0.80078 2.2461-0.16797 5.4414-0.80078 9.5938-1.8086 2.7656-0.69922 8.8125-2.5938 18.148-5.6992 6.3945-2.2578 11.922-3.3828 16.594-3.3828 3.457-0.35156 7.7773 0.18359 12.965 1.5742l4.4141 1.5234 3.1094 1.5742c1.5586 0.84375 2.2461 1.5469 2.0703 2.0664-0.17188 0.34766-1.2031 0.52734-3.1133 0.52734l-7.2578-0.78516c-5.1797 0-8.9805 0.33594-11.402 1.0352-3.9766 0.52734-8.6406 2.0898-14 4.6797-8.8125 3.7969-14.945 6.293-18.406 7.5-4.3164 1.2227-8.125 2.0781-11.406 2.6094-4.8398 0.85547-9.4258 0.77344-13.742-0.27344-2.2383-0.6875-4.582-1.7266-7-3.1016-2.25-1.2148-4.3242-2.6055-6.2227-4.1562-3.1094-3.1133-5.9648-7.1016-8.5508-11.922-3.4648-6.4023-6.5703-15.121-9.3359-26.176l-3.1094-13.242c-0.86719-3.4453-1.3906-7.8555-1.5586-13.199-0.86328 0.84375-1.7305 1.625-2.5938 2.3242-3.6289 4.4922-7.1719 8.2227-10.629 11.133-5.0195 4.3398-9.7656 7.5312-14.262 9.5977-5.5273 2.7656-10.801 4.8438-15.809 6.2227-6.2266 1.3906-11.582 2.0781-16.078 2.0781-5.5273 0.16406-11.406-0.24609-17.629-1.3008 0.35156 1.9102 0.77734 3.8125 1.3008 5.7188 0.16797 0.85156 0.59766 3.5352 1.293 8.0352l0.25391 8.0234c0 6.4023-0.77734 12.105-2.3281 17.129-2.2461 6.5586-5.707 12.02-10.371 16.324-0.34766 0.17188-0.69922 0.44141-1.043 0.76562 3.4648 0.36328 6.9141 1.1406 10.375 2.3359 5.707 1.5742 10.977 3.7188 15.812 6.4961 3.6289 2.4141 5.6992 3.8867 6.2227 4.3906l2.8516 2.3398 2.0781 2.3242c0.86328 0.88672 1.9883 2.3359 3.375 4.4336l1.8125 3.875c0.6875 2.25 0.6875 3.7188 0 4.4062-0.69531 0.34766-1.9883 0-3.8867-1.0469-2.7734-1.8984-5.1875-3.3672-7.2617-4.4062l-4.9297-2.5938c-2.4258-1.2109-4.3164-2.0664-5.6992-2.5859-4.4922-1.9141-9.2461-3.543-14.262-4.9219-4.1484-1.2031-9.0781-2.4258-14.777-3.6289-4.4961-1.2148-7.9453-2-10.371-2.3242-5.5273 1.0117-11.066 1.2891-16.586 0.77734-6.2227-0.53125-12.102-2.0898-17.633-4.6875-5.0195-2.5938-9.7617-5.6094-14.258-9.0547-1.5586-1.2109-3.0234-2.4961-4.4023-3.8984h-1.043c-14.695-1.7344-27.57-3.7031-38.633-5.9648-5.5312-1.0234-9.9336-2.0781-13.223-3.1133-5.707-1.7266-10.371-3.5352-14-5.4531-1.9023-1.0117-3.1133-1.7852-3.6289-2.3242-2.0703-1.3906-3.2812-2.1445-3.6328-2.3242l-5.9531-7.0117c-2.5977-3.6172-5.4414-8.4688-8.5625-14.508-4.3164-9.6836-8.3828-20.73-12.188-33.188-1.5508-5.0195-3.1133-11-4.6641-17.887-1.7305-6.7422-3.0234-13.055-3.8867-18.922-0.17188-3.4648-0.26172-7.1016-0.26172-10.898 0.34766-4.1445 1.293-7.8633 2.8516-11.145 1.9102-4.3281 4.7539-7.5938 8.5586-9.8555 3.1211-1.7344 7-2.7656 11.664-3.1133 5.7109 0 12.188 1.125 19.449 3.3828 3.1094 1.2031 6.3125 2.4961 9.5938 3.875 0-0.33594 0.085938-0.69922 0.25781-1.0352l1.8203-2.0781c-1.2148-1.0352-2.5977-2.3281-4.1562-3.8867-5.5312-6.0547-9.5938-13.402-12.18-22.035-1.3945-4.8398-1.9883-9.8438-1.8203-15.055 0.35156-6.0469 1.8984-11.648 4.6641-16.844 1.3789-2.7539 3.1094-5.168 5.1875-7.2344l3.3711-2.8789 3.6289-2.3359c3.8008-2.418 8.4727-4.3164 14-5.6992 7.4375-2.0664 15.391-3.125 23.863-3.125 3.4492-0.16406 6.5625-0.16406 9.3242 0 2.9453-4.3125 6.0547-8.3672 9.3359-12.176 4.3242-5.3594 8.3906-9.5938 12.188-12.707 5.1914-4.4961 10.199-8.2227 15.035-11.148 9.5078-6.043 21.004-11.574 34.492-16.586 5.0117-1.7461 11.059-3.8008 18.145-6.2227 3.9766-1.3789 9.7734-3.2812 17.375-5.7109 5.707-1.9023 16.586-5.6211 32.664-11.145 24.371-8.8086 43.125-14.777 56.262-17.887 15.379-3.9883 28.605-6.1445 39.664-6.4727 2.5938-0.17969 5.0195-0.17969 7.2578 0-0.17188-1.9141-0.17188-3.7109 0-5.4609 0.69531-4.1328 2.0703-8.0352 4.1484-11.664 2.2461-4.6641 5.4414-8.6367 9.5938-11.91 5.0078-3.8125 10.719-6.1484 17.113-7.0117 6.5273-0.66406 13.09 0.22266 19.66 2.6367zm-49.262 175.25c5.3594-5.5234 10.375-9.9414 15.035-13.234 7.7852-5.6914 18.676-12.086 32.676-19.176 14.508-7.4297 24.539-12.801 30.066-16.078 5.5391-3.4648 9.9414-6.4023 13.223-8.832l11.93-8.5273c3.1094-2.4258 4.8398-3.8867 5.1875-4.4141l4.9219-4.6641c1.3828-1.2148 2.8516-2.6719 4.4062-4.4141 0.86719-1.1992 2.2461-2.8438 4.1484-4.9336 4.1484-5.1641 8.125-11.137 11.93-17.875 0.6875-1.3828 3.2773-6.3125 7.7852-14.777 3.7969-8.8203 6.1328-13.145 6.9961-12.965 0.86328 0.35156 0.085938 5.1797-2.3359 14.516l-5.6992 16.598c-0.6875 1.0352-1.4688 2.5859-2.3281 4.6641-0.86719 2.0781-1.7344 3.7109-2.5938 4.9336l-6.4805 10.625c-3.8008 5.3555-6.5703 8.9922-8.3047 10.875l-4.9219 5.1953-17.891 14.777c-2.2461 1.9023-6.7383 5.0898-13.48 9.5938-4.4922 2.9414-14.598 8.6523-30.328 17.121-13.828 7.4297-24.199 13.652-31.113 18.664-8.125 5.707-16.16 14.012-24.113 24.887-6.9102 9.168-12.707 18.664-17.371 28.52-2.0703 3.9805-4.2344 8.7344-6.4805 14.246l-4.1484 13.496-0.77344 5.9531c0.16797 3.1016 0.42969 5.2031 0.77344 6.2344 0.17188 2.9297 1.125 6.8984 2.8555 11.922 1.5586 4.4922 3.7188 10.719 6.4805 18.664 1.5586 0.16406 2.5078 0.24609 2.8516 0.24609 7.4297 1.2227 13.137 3.7422 17.109 7.543 1.9023 1.5586 3.1992 3.1133 3.8906 4.6641 0.51953 1.7266 0.42969 2.8398-0.25391 3.3594-0.51953 0.51953-1.4727 0.78906-2.8633 0.78906-0.6875 0-2.4141-0.26953-5.1797-0.78906l-11.414-1.5586c0.33984 1.5586 0.69531 3.293 1.0352 5.1914 0.51953 4.1445 0.51953 7.7773 0 10.91-0.33984 2.582-0.77734 3.8633-1.293 3.8633-0.51953 0-0.95312-1.2812-1.3047-3.8633-1.0312-3.8203-1.8984-7.1016-2.5859-9.8672-1.3828-4.6758-3.457-9.7656-6.2227-15.305-3.7969-8.4688-6.8281-15.379-9.0703-20.742-2.2461-5.5234-3.7188-9.918-4.4062-13.211 0-0.18359-0.35156-2.7539-1.0352-7.7773l0.51562-8.2891c0.34766-1.9102 0.60547-3.2969 0.77734-4.1602l3.375-11.391c1.8984-5.1914 3.9766-10.297 6.2148-15.305 5.0195-10.711 10.977-21.102 17.891-31.102 4.4922-6.2422 8.4688-11.164 11.918-14.801zm-265.48-3.1055c7.7734-14.52 12.012-22.539 12.699-24.121 1.2109-2.0664 2.5078-4.0586 3.8867-5.9648-1.2031 0.17188-2.2461 0.44141-3.1133 0.78906-9.3281 1.9102-16.418 3.6289-21.258 5.1797-9.3281 3.1211-15.469 7.5195-18.406 13.227-3.457 6.2227-4.1445 13.742-2.0781 22.551 1.3828 7.0938 3.8906 13.492 7.5195 19.18 0.51562 0.69922 1.0352 1.3906 1.5586 2.0781 0.85547-1.2031 2.0781-3.1016 3.6289-5.6992 1.5586-2.2461 3.1133-4.7617 4.6641-7.5273z"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};

export default Frog;
