import Image from "next/image";

export default function NyleLogo({
  alt = "Nyle logo",
  className = "",
  width = 52,
  height = 52,
  priority = false,
}) {
  return (
    <Image
      src="/nyle-mark.svg"
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
