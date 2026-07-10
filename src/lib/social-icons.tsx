import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { SocialPlatform } from "@/types";

export const SOCIAL_ICONS: Partial<Record<SocialPlatform, IconType>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
};
