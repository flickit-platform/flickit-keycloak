import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import { clsx } from "keycloakify/tools/clsx";

export default function LoginVerifyEmail(
  props: PageProps<
    Extract<KcContext, { pageId: "login-verify-email.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });
  const { msg, msgStr } = i18n;

  const { user } = kcContext;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={msg("emailVerifyTitle")}
    >
      <form className={getClassName("kcFormClass")}>
        <p className="instruction" style={{ textAlign: "center" }}>
          {msg("emailVerifyInstruction1", user?.email ?? "")}
        </p>
        <div
          id="kc-form-buttons"
          className={getClassName("kcFormButtonsClass")}
        >
          <input
            className={clsx(
              getClassName("kcButtonClass"),
              getClassName("kcButtonDefaultClass"),
              getClassName("kcButtonLargeClass")
            )}
            type="submit"
            value={msgStr("resendEmail")}
          />
        </div>
      </form>
    </Template>
  );
}
