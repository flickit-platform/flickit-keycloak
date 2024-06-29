import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function LoginResetPassword(
  props: PageProps<
    Extract<KcContext, { pageId: "login-reset-password.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { url, realm, auth } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={msg("emailForgotTitle")}
      infoNode={msg("emailInstruction")}
    >
      <form
        id="kc-form"
        className={getClassName("kcFormClass")}
        action={url.loginAction}
        method="post"
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        <div id="kc-form-wrapper" className="reset-password-form">
          <div
            style={{
              fontFamily: "Ubuntu",
              fontWeight: 300,
              fontSize: "0.875rem",
              textAlign: "center",
              color: "#9DA7B3",
              marginBottom: "1.5rem",
            }}
          >
            Don’t worry! Enter your username or email address below and we will
            send you instructions on how to create a new password.
          </div>
          <div className={getClassName("kcFormGroupClass")}>
            <div className={getClassName("kcLabelWrapperClass")}>
              <label
                htmlFor="username"
                className={getClassName("kcLabelClass")}
              >
                {!realm.loginWithEmailAllowed
                  ? msg("username")
                  : !realm.registrationEmailAsUsername
                  ? msg("usernameOrEmail")
                  : msg("email")}
              </label>
            </div>
            <div className={getClassName("kcInputWrapperClass")}>
              <input
                type="text"
                id="username"
                name="username"
                className={getClassName("kcInputClass")}
                autoFocus
                defaultValue={
                  auth !== undefined && auth.showUsername
                    ? auth.attemptedUsername
                    : undefined
                }
              />
            </div>
          </div>
          <div
            className={clsx(
              getClassName("kcFormGroupClass"),
              getClassName("kcFormSettingClass")
            )}
          >
            <div
              id="kc-form-buttons"
              className={getClassName("kcFormButtonsClass")}
            >
              <input
                className={clsx(
                  getClassName("kcButtonClass"),
                  getClassName("kcButtonPrimaryClass"),
                  getClassName("kcButtonLargeClass")
                )}
                type="submit"
                value={msgStr("doSubmit")}
              />
            </div>
          </div>
        </div>
      </form>
    </Template>
  );
}
