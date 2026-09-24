import { redirect } from "react-router";
import { defaultLocale, homePath } from "~/i18n";

export function loader() {
  return redirect(homePath(defaultLocale));
}
