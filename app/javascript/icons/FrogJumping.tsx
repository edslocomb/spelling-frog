import { SvgIcon, type SvgIconProps } from "@mui/material";

export const FrogJumping = (props: SvgIconProps) => {
  const { sx } = props;

  return (
    <SvgIcon
      width="400px"
      height="400px"
      {...props}
      viewBox="100 100 500 500"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      sx={sx}
    >
      <script>
        {/* eslint-disable react/jsx-no-comment-textnodes */}
        /* Adapted from: Frog, by Saeful Muslim, CCBY3.0
        https://thenounproject.com/icon/frog-1132898/ */
        {/* eslint-enable react/jsx-no-comment-textnodes */}
      </script>
      <path
        d="m550.61 79.207c2.2383 0.51953 4.4062 1.2109 6.4727 2.082 2.6055 0.6875 6.0586 2.0781 10.383 4.1328 1.2148 0.53906 2.5938 0.87891 4.1445 1.0547l2.0898 0.78516 9.832-0.78516c3.4648-0.6875 6.9219-1.6406 10.371-2.8555 0.69922-0.51953 1.2148-0.875 1.5625-1.0352 0.50391 1.8945 0.77734 3.1992 0.77734 3.8867 0.35156 2.9336-0.089844 6.043-1.2891 9.3125-1.7422 3.8125-4.832 7.3633-9.3281 10.641-1.3984 1.0352-3.0391 2.0781-4.9336 3.125-1.9023 3.6289-4.3125 7.7656-7.2539 12.434-11.582 18.156-25.508 35.352-41.746 51.586-10.203 10.035-20.738 18.922-31.641 26.719-0.16406 1.2148-0.50391 2.4258-1.0312 3.6328-0.35156 2.75-1.2148 7.2422-2.6055 13.461-0.33203 3.2891-0.50391 5.8086-0.50391 7.5195v2.8555l0.25391 0.52734v0.51953l0.52734 0.76562c0.51562 1.0469 2.4297 2.0781 5.7109 3.1133 3.6172 1.5586 6.125 2.6875 7.5156 3.3828l6.7383 4.6641 0.77734 1.3008c1.1914 1.7266 2.2383 4.0664 3.1094 7 0.6875 3.6172 0.60938 7.1719-0.25391 10.629-0.875 2.25-1.5625 3.3477-2.0898 3.3477-0.51562-0.32422-1.1133-1.5352-1.7812-3.6055-0.88672-3.8008-1.6758-6.5977-2.3633-8.3047-1.3672-2.2344-2.4062-3.7031-3.0977-4.4023l-1.3086-1.3008-3.0977-1.5625c-3.1211-0.85156-5.543-1.5625-7.2734-2.0547-2.2305-0.875-3.8906-1.5508-4.9102-2.0898-2.0898-1.0352-3.7305-2.3281-4.9453-3.8867-0.85156-1.0234-1.3672-2.0664-1.5391-3.1133l-1.043-3.1133v-5.1836c0-1.9023 0.41406-4.8438 1.2891-8.7969 0.86328-3.293 1.9805-6.5781 3.3711-9.8555l-1.8125 1.0117c-0.51562 2.7812-1.5508 6.9492-3.1094 12.477-2.0664 7.2461-3.2031 11.48-3.3711 12.699-0.52734 3.1016 0.089844 6.125 1.8047 9.0547 1.2148 2.0781 3.457 4.6641 6.7578 7.7891 3.7852 3.4766 6.3125 6.0664 7.5039 7.7773 2.418 2.7656 3.6289 5.7773 3.6289 9.0781 0.17188 0.34766 0 1.6445-0.50391 3.875l-2.8555 5.1914-1.8242 1.0469c-0.86328 0.51953-1.3672 0.6875-1.5508 0.51953-0.17188-0.16406-0.078125-0.6875 0.25391-1.5625l1.043-3.625c0.17188-1.043 0.26172-1.7969 0.26172-2.3281l-0.26172-2.5938c-0.33984-1.5508-1.4688-3.375-3.3711-5.4414-0.67578-0.6875-3.1914-2.7656-7.5156-6.2227-1.3672-1.2227-2.8438-2.4141-4.418-3.6289l-4.1445-5.2031c-1.5391-1.8867-2.6719-4.2227-3.3711-6.9883-0.51562-2.5859-0.59766-5.2656-0.26172-8.0352 0-1.8867 0.44922-4.3125 1.3008-7.2617 0.875-2.9336 1.4766-5.0898 1.8242-6.457 1.3789-6.0742 2.5938-10.555 3.6172-13.496 1.3984-4.832 2.8555-8.9102 4.4062-12.191l1.043-2.8438c0.86328-1.7344 1.4766-2.7656 1.8125-3.125 0.6875-1.5391 1.9141-3.1875 3.6289-4.9219 1.2148-1.5625 3.8086-3.875 7.7773-7 3.1094-2.9414 5.0977-4.7539 5.957-5.4414 1.3906-1.7344 2.5039-3.125 3.3828-4.1445 0.85156-1.7344 1.3789-2.8555 1.5391-3.3828 0.51562-0.6875 0.96484-1.0352 1.3008-1.0352 0.52734-0.16797 0.77734 0.17188 0.77734 1.0352 0.33984 1.0547 0.33984 2.5977 0 4.6758-0.6875 1.9102-1.7305 3.9766-3.1211 6.2148-1.0312 1.7461-2.8438 3.9805-5.4375 6.7461-3.4453 3.6172-5.6211 6.0312-6.4844 7.2539-1.0312 1.5586-1.7305 2.8555-2.0664 3.8984l-2.3398 4.9102c0 0.51562-0.078125 0.96875-0.25391 1.3086 11.582-7.4414 22.883-16.34 33.969-26.711 15.379-14.699 29.812-30.941 43.289-48.754 1.2031-1.5508 3.1211-4.1289 5.6992-7.7656-1.3789 0.6875-2.7539 1.3008-4.1445 1.7969-4.1445 1.5586-8.9023 3.1367-14.285 4.6797-6.1992 2.0781-9.9844 3.3672-11.387 3.8867-0.17188 0-2.582 0.95703-7.2539 2.8672-2.0898 0.50781-3.2812 0.58984-3.6289 0.23438-0.52734-0.51562-0.18359-1.7266 1.043-3.625 1.3789-1.5508 3.707-3.2891 6.9766-5.1875 3.6406-2.582 11.934-6.3945 24.902-11.391 5.3594-2.4375 9.5938-4.5117 12.699-6.2344 3.2812-2.082 5.875-4.3164 7.7891-6.7422 1.5391-1.7266 2.8438-3.875 3.8789-6.4727 0.16406 0 0.26172-0.16797 0.26172-0.53906-2.2383 1.5664-5.0117 2.7773-8.2891 3.6328-1.7422 0.35156-3.1094 0.53125-4.168 0.53125l-4.3945 1.0352h-4.6719c-1.3789 0-3.1094-0.35156-5.1758-1.0352-4.6797-2.0898-8.1133-3.457-10.383-4.168-4.1445-1.5391-7.6875-1.6289-10.629-0.25391v0.25391c-2.9414 0.87891-5.7109 2.8672-8.3008 5.9766-1.5391 1.9023-4.1445 5.1016-7.7656 9.582-1.9141 2.2617-3.4648 4.0781-4.6797 5.4531-1.707 1.1914-2.7539 1.9805-3.1094 2.3359-0.6875 0.51953-1.3789 0.95313-2.0781 1.293l-14.777 6.4805c-3.1094 1.2109-7.5156 3.3672-13.211 6.4727-6.7383 3.125-11.672 5.3633-14.777 6.7539-6.4102 2.9219-11.934 4.9219-16.605 5.9531-5.0117 1.3984-11.059 2.1602-18.145 2.3359-10.191 0.34766-16.066 0.51562-17.629 0.51562-3.1094 0.17188-5.9531 0.61719-8.5391 1.2812-2.9414 1.2266-5.4609 2.2461-7.5156 3.1367-4.8438 2.9297-9.1797 6.9102-12.98 11.91-2.25 2.6094-6.2109 7.875-11.91 15.832-2.5938 3.457-4.5938 6.0312-5.9688 7.7656l-7.2617 8.0352c-0.85156 1.2109-3.2812 3.7227-7.2539 7.5195-2.0898 2.0898-4.6719 4.4141-7.7891 7.0234-3.457 3.4336-8.6289 8.2812-15.551 14.516-5.6992 5.5156-10.445 10.629-14.262 15.293-1.043 1.3789-2.6836 3.4336-4.9219 6.1992-1.3789 2.0781-2.9414 4.4297-4.6719 7.0234-0.6875 1.7148-3.0195 6.6523-7.0117 14.758-3.0977 6.4023-5.8633 11.512-8.2812 15.305-3.457 5.1797-7.3398 9.582-11.672 13.211-1.3672 1.2227-2.5039 2.1797-3.3711 2.8672l-3.8633 2.082c-3.457 1.9219-5.7969 3.207-7 3.8984l-14.262 7.2578c-3.6289 2.0664-5.7969 3.3672-6.4727 3.8984-1.9023 0.85156-3.8906 2.1445-5.9688 3.875-0.51562 0.17188-1.3906 0.96875-2.5938 2.3281l-2.5938 2.0781-4.3945 5.4609c-2.2617 2.9297-4.9336 6.9883-8.043 12.168-3.9805 6.043-6.668 9.9297-8.043 11.676l-6.4961 9.0664-7.7773 7.7773c-0.85156 0.6875-1.8125 1.4766-2.8555 2.3281l-3.3594 1.5586c-3.1211 2.0781-7 4.1562-11.672 6.2148-6.9102 2.9453-10.719 4.5742-11.418 4.9375l-10.109 5.9531c-2.9297 1.9141-5.6211 4.3242-8.043 7.2578-3.9688 4.168-7.7656 9.8672-11.406 17.137-1.3789 2.7422-4.1445 8.3789-8.2812 16.844-5.7109 12.609-10.809 21.695-15.289 27.227-4.6797 5.6914-9.6992 9.918-15.055 12.699l-4.9336 1.8086c-1.0312 0.34766-1.5508 0.42578-1.5508 0.25781l1.2891-1.0352 4.418-2.5977c5.0117-3.457 9.2305-7.9453 12.699-13.461 3.9805-5.3711 8.5508-14.352 13.746-26.977 3.1094-7.7773 5.6992-13.652 7.7656-17.641 3.8086-7.7773 7.6992-13.988 11.68-18.652 2.5938-3.2812 5.5234-6.1484 8.8047-8.5586l10.879-6.9883c1.5508-0.35156 5.3594-1.9805 11.43-4.9219 4.8203-2.25 8.6406-4.3281 11.395-6.2383l2.582-1.3008c1.2148-0.85547 2.0117-1.6367 2.3398-2.3242l2.3281-1.5508 8.3008-9.8438 1.5625-3.125c1.2031-1.5391 3.707-5.6094 7.5273-12.191 3.4453-5.1758 6.3008-9.3203 8.5273-12.441l4.9336-6.4805 6.2227-5.1875c3.457-2.5938 5.7109-4.2344 6.7383-4.9336l27.746-14.766 2.8438-2.3359c0.86328-0.16797 2-0.86719 3.3711-2.0664 3.4648-2.9531 6.7461-6.7539 9.8555-11.418 2.25-3.457 4.6719-8.2031 7.2617-14.258 3.457-6.9102 5.957-11.91 7.5156-15.047 1.7305-2.5977 3.3047-5.1797 4.6719-7.7656 0.86328-0.875 2.7656-3.1875 5.6992-7.0117 5.7109-6.9062 15.988-17.098 30.867-30.586 12.773-11.574 21.863-21.336 27.223-29.293 6.0469-8.3008 10.109-13.559 12.188-15.82 4.832-6.043 10.02-10.629 15.539-13.73 2.7891-1.5469 6.0586-2.8672 9.8555-3.8984 0.52734-0.15625 2.25-0.51562 5.1953-1.0352l4.9336-0.77344c2.918 0 8.8945-0.10156 17.879-0.27344 7.0898-0.17969 12.609-0.67578 16.582-1.5469 3.9805-0.875 9.0898-2.4961 15.309-4.9336 2.9297-1.3672 7.7656-3.6172 14.516-6.7305 5.8633-2.7656 10.535-4.9453 13.988-6.4844l13.223-5.4492c3.1094-1.0234 6.2227-3.457 9.3281-7.2617 3.6406-4.1328 6.4023-7.3242 8.3008-9.5938 3.293-3.4453 6.9219-5.7852 10.902-6.9883h-0.28516c2.3008-1.2109 4.7148-1.6406 7.3086-1.3047zm-173.71 166.19c3.9805-3.9766 8.4766-7.0781 13.473-9.3281 1.043-0.34766 2.3398-0.86719 3.9023-1.5586l51.582-16.07c3.6289-1.3789 7.6094-2.9336 11.934-4.6719 0.85156-2.0703 1.9883-5.0117 3.3828-8.7969 1.8945-4.8477 4.7383-11.066 8.5508-18.688 5.3477-11.395 8.6406-16.684 9.8438-15.809 1.2148 0.17969 0 6.3008-3.6289 18.402-1.0312 3.6172-3.2695 9.9297-6.7266 18.945l-7.5391 23.574c-1.3906 4.8477-2.0781 8.457-2.0781 10.875-0.16406 1.0547 0.089844 2.2617 0.78906 3.6523 0.51562 0.86328 1.4766 2.3242 2.8555 4.4023l3.1094 4.9219c1.5625 3.2969 2.3398 5.0195 2.3398 5.1758 1.2031 2.7773 1.8047 4.6094 1.8047 5.4727l0.53906 2.5742v2.3242c0.33984 5.7305-0.97266 10.555-3.8906 14.531-1.9023 2.7656-3.2031 4.0703-3.8906 3.8984-0.17188-0.34766 0.089844-2.25 0.77734-5.7109 1.043-3.8008 1.2148-7.7773 0.51562-11.934l-0.26172-1.5508-0.77734-2.0664c-0.16406-0.86719-0.77734-2.2344-1.8125-4.1562-1.0312-1.5352-1.8125-2.832-2.3281-3.8867l-3.3711-4.6641c-1.9023-2.7773-3.0391-4.4023-3.3711-4.9219-1.7305-2.4258-2.5938-5.0078-2.5938-7.7734 0.17188-2.25 0.41406-4.7539 0.78906-7.5312 0.85156-2.25 1.5273-4.4023 2.0547-6.4727l1.0312-3.8789c-1.7305 0.51562-3.5352 1.0234-5.4375 1.5586l-51.32 16.832c-1.2148 0.51953-2.168 0.95703-2.8555 1.3086-3.9805 1.7305-7.6992 4.3125-11.145 7.7773-2.0781 1.7344-5.1055 5.4336-9.0898 11.148-4.832 6.5586-8.1133 10.801-9.8555 12.699-4.1445 4.6602-8.7305 8.2031-13.738 10.625-4.6719 2.4258-9.9297 4.3281-15.805 5.6992-7.1016 1.2227-12.371 2.168-15.812 2.8672-4.1562 0.6875-8.7422 2.0781-13.746 4.1328-3.9688 2.0898-7.8633 4.5742-11.66 7.5195-4.8438 3.8125-10.891 10.898-18.145 21.27-3.1289 4.4805-5.9688 8.3789-8.5742 11.652-1.0312 1.0469-2.6602 2.9414-4.9102 5.7188-0.69922 0.86719-2.4297 2.5078-5.1875 4.9102-3.457 2.6055-7.3516 5.2852-11.672 8.0469-0.86328 0.51563-4.832 2.7539-11.922 6.7539-4.6797 2.4141-8.3789 4.4805-11.145 6.2109-5.7109 3.457-9.168 5.6992-10.383 6.7305-13.836 9.3242-24.031 19.543-30.594 30.609-1.3789 2.2227-2.168 3.6172-2.3281 4.1328l-2.0898 4.4062c-0.16406 0.69922-1.1914 3.5391-3.1094 8.5586-1.8945 6.5703-3.7969 12.266-5.6992 17.113-2.418 5.3555-4.6719 9.6836-6.7383 12.969 3.1094-3.2891 5.7969-6.9062 8.043-10.879l3.3711-7.2578c1.5391-3.2969 2.7539-5.8906 3.6289-7.8008 1.3906-3.9688 2.3203-6.9219 2.8555-8.8086l2.582-7.5273 1.3008-2.5859c2.7539-7.2461 7.1719-13.832 13.223-19.699 1.7188-1.5586 4.9219-4.1562 9.5938-7.7891l5.1758-3.3711c1.3906-0.86328 3.293-1.8984 5.7109-3.1133 3.293-1.5508 7.0898-3.1758 11.406-4.9219 2.4297-0.86328 6.0469-2.2383 10.879-4.1445 7.9648-3.1289 14.254-6.1328 18.934-9.082 4.5078-2.7539 9.25-6.8281 14.262-12.18 2.0664-2.4258 5.4492-6.8281 10.109-13.211 7.2617-9.8555 12.531-16.441 15.812-19.699 1.9141-2.2617 3.7422-4 5.4492-5.2031 1.043-0.69531 1.6406-1.0352 1.8125-1.0352 0.35156 0.16797-1.1133 2.8516-4.4062 8.0352-2.0781 3.4648-6.3125 10.633-12.699 21.527-3.7969 5.6992-7.1719 10.543-10.109 14.508-5.0273 6.2227-10.203 11.066-15.562 14.52-5 3.6328-11.832 7.0898-20.473 10.359-4.6719 1.9219-8.2148 3.2969-10.641 4.168-4.1445 1.8984-7.6875 3.6133-10.617 5.1758-14.352 6.5703-24.371 16.18-30.09 28.777l-1.2891 1.8438-6.2227 16.312c-2.2305 4.8438-3.4453 7.6055-3.6172 8.293l-2.3281 3.9023c-0.35937 0.33984-1.2148 1.5508-2.5938 3.6133-4.6719 6.7422-10.809 12.797-18.418 18.16-3.2812 2.0664-5.5234 3.5273-6.7383 4.4023-3.8086 3.2773-7.5977 5.7969-11.406 7.5195-3.8086 1.7266-5.8086 2.4258-5.957 2.0781-0.17188-0.18359 1.4688-1.3789 4.9219-3.6406 4.6719-3.1133 8.9883-7.0781 12.969-11.922 2.2383-2.7773 4.4844-6.3125 6.7266-10.629 2.4297-3.9688 4.5078-8.5586 6.2344-13.742 1.2148-3.457 2.918-8.7969 5.1758-16.066 1.0547-4.4805 1.9883-7.7773 2.8555-9.8555l4.4062-9.5977c6.5742-12.09 17.293-23.426 32.156-33.953 2.25-1.5508 5.7852-3.8008 10.641-6.7422 1.7188-1.2031 5.4375-3.4648 11.133-6.7422 6.0586-3.2695 9.7656-5.5234 11.133-6.7461 4.3398-2.418 7.875-4.8164 10.641-7.2422 2.25-1.9141 3.6406-3.4766 4.1562-4.6641l13.211-16.348c3.6289-5.3555 6.4023-9.3359 8.3008-11.922 3.7969-4.6641 7.5156-8.4688 11.156-11.418 8.2891-7.0781 18.047-11.648 29.289-13.73 3.4453-0.6875 8.5391-1.6445 15.289-2.8398 6.2227-1.3984 10.891-2.8789 14-4.4297 3.4648-2.0547 7.1016-5.0781 10.891-9.0781 2.0781-2.4141 5.1758-6.3008 9.3203-11.652 4.1562-5.8906 7.6172-10.031 10.371-12.457zm92.309 3.3711c0.51562-0.69922 1.2812-1.0469 2.3203-1.0469 1.3789 0 2.8438 0.44141 4.4062 1.3086 2.0664 1.0352 3.9805 2.5859 5.7109 4.6641 1.9023 2.2383 3.1797 4.8438 3.8789 7.7773 0.88672 2.7656 1.125 5.6992 0.78906 8.8203-0.35938 2.4141-0.95312 4.5625-1.8125 6.457-1.043 1.7461-2.168 3.1367-3.3828 4.1602-1.0312 0.51562-1.8047 0.60938-2.3281 0.25781-0.52734-0.17188-0.85156-0.86328-1.043-2.0664 0-0.53125 0.089844-1.8086 0.25391-3.875 0-4.6641-0.50391-8.3164-1.5391-10.91-0.69922-3.1133-2.25-6.4727-4.6719-10.109-1.2148-1.7461-1.9023-2.8516-2.0664-3.3711-0.51562-1.0273-0.69922-1.7031-0.51562-2.0664zm-314.77 174.48c1.2266 0.18359 1.043 3.543-0.50391 10.121-2.0781 8.4766-5.5234 15.797-10.383 22.035-4.832 6.5703-10.961 12.105-18.387 16.586-6.2422 2.9453-9.6133 3.8984-10.129 2.8789-0.6875-1.2305 1.3906-4.0781 6.2227-8.5625 2.7539-2.9531 5.0977-5.3633 7-7.2578 3.1094-3.1133 5.6992-6.0547 7.7891-8.8203 2.7422-3.9766 6.7383-10.375 11.922-19.195 3.2891-5.6992 5.4453-8.2969 6.4688-7.7852z"
        fillRule="evenodd"
      />
    </SvgIcon>
  );
};

export default FrogJumping;
