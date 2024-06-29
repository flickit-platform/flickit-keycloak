// ejected using 'npx eject-keycloak-page'
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import githubIcon from "../assets/github_logo.svg";
import googleIcon from "../assets/google_logo.svg";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register(
  props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const {
    social,
    url,
    messagesPerField,
    register,
    realm,
    passwordRequired,
    recaptchaRequired,
    recaptchaSiteKey,
  } = kcContext;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { msg, msgStr } = i18n;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={msg("registerTitle")}
    >
      <form
        id="kc-register-form"
        className={getClassName("kcFormClass")}
        action={url.registrationAction}
        method="post"
      >
        <div
          className={clsx(
            getClassName("kcFormGroupClass"),
            messagesPerField.printIfExists(
              "firstName",
              getClassName("kcFormGroupErrorClass")
            )
          )}
        >
          <div className={getClassName("kcLabelWrapperClass")}>
            <label htmlFor="firstName" className={getClassName("kcLabelClass")}>
              {msg("firstName")}
            </label>
          </div>
          <div className={getClassName("kcInputWrapperClass")}>
            <input
              type="text"
              id="firstName"
              className={getClassName("kcInputClass")}
              name="firstName"
              defaultValue={register.formData.firstName ?? ""}
            />
          </div>
        </div>
        <div
          className={clsx(
            getClassName("kcFormGroupClass"),
            messagesPerField.printIfExists(
              "lastName",
              getClassName("kcFormGroupErrorClass")
            )
          )}
        >
          <div className={getClassName("kcLabelWrapperClass")}>
            <label htmlFor="lastName" className={getClassName("kcLabelClass")}>
              {msg("lastName")}
            </label>
          </div>
          <div className={getClassName("kcInputWrapperClass")}>
            <input
              type="text"
              id="lastName"
              className={getClassName("kcInputClass")}
              name="lastName"
              defaultValue={register.formData.lastName ?? ""}
            />
          </div>
        </div>

        <div
          className={clsx(
            getClassName("kcFormGroupClass"),
            messagesPerField.printIfExists(
              "email",
              getClassName("kcFormGroupErrorClass")
            )
          )}
        >
          <div className={getClassName("kcLabelWrapperClass")}>
            <label htmlFor="email" className={getClassName("kcLabelClass")}>
              {msg("email")}
            </label>
          </div>
          <div className={getClassName("kcInputWrapperClass")}>
            <input
              type="text"
              id="email"
              className={getClassName("kcInputClass")}
              name="email"
              defaultValue={register.formData.email ?? ""}
            />
          </div>
        </div>

        {!realm.registrationEmailAsUsername && (
          <div
            className={clsx(
              getClassName("kcFormGroupClass"),
              messagesPerField.printIfExists(
                "username",
                getClassName("kcFormGroupErrorClass")
              )
            )}
          >
            <div className={getClassName("kcLabelWrapperClass")}>
              <label
                htmlFor="username"
                className={getClassName("kcLabelClass")}
              >
                {msg("username")}
              </label>
            </div>
            <div className={getClassName("kcInputWrapperClass")}>
              <input
                type="text"
                id="username"
                className={getClassName("kcInputClass")}
                name="username"
                defaultValue={register.formData.username ?? ""}
                autoComplete="username"
              />
            </div>
          </div>
        )}
        {passwordRequired && (
          <>
            <div
              className={clsx(
                getClassName("kcFormGroupClass"),
                messagesPerField.printIfExists(
                  "password",
                  getClassName("kcFormGroupErrorClass")
                )
              )}
            >
              <div className={getClassName("kcLabelWrapperClass")}>
                <label
                  htmlFor="password"
                  className={getClassName("kcLabelClass")}
                >
                  {msg("password")}
                </label>
              </div>
              <div className={getClassName("kcInputWrapperClass")}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={getClassName("kcInputClass")}
                  name="password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password-visibility"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div
              className={clsx(
                getClassName("kcFormGroupClass"),
                messagesPerField.printIfExists(
                  "password-confirm",
                  getClassName("kcFormGroupErrorClass")
                )
              )}
            >
              <div className={getClassName("kcLabelWrapperClass")}>
                <label
                  htmlFor="password-confirm"
                  className={getClassName("kcLabelClass")}
                >
                  {msg("passwordConfirm")}
                </label>
              </div>
              <div className={getClassName("kcInputWrapperClass")}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password-confirm"
                  className={getClassName("kcInputClass")}
                  name="password-confirm"
                />
                <button
                  type="button"
                  className="toggle-password-visibility"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </>
        )}
        {recaptchaRequired && (
          <div className="form-group">
            <div className={getClassName("kcInputWrapperClass")}>
              <div
                className="g-recaptcha"
                data-size="compact"
                data-sitekey={recaptchaSiteKey}
              ></div>
            </div>
          </div>
        )}
        <div className={getClassName("kcFormGroupClass")}>
          <div
            id="kc-form-buttons"
            className={getClassName("kcFormButtonsClass")}
          >
            <input
              className={clsx(getClassName("kcButtonPrimaryClass"))}
              type="submit"
              value={msgStr("doRegister")}
            />
          </div>
        </div>
        {social.providers !== undefined && (
          <>
            <div className="separator">
              <hr />
              <span>{msg("continueWithAcountsIn")}</span>
              <hr />
            </div>
            <div
              id="kc-social-providers"
              className={clsx(
                getClassName("kcFormSocialAccountContentClass"),
                getClassName("kcFormSocialAccountClass")
              )}
            >
              <ul
                className={clsx(
                  getClassName("kcFormSocialAccountListClass"),
                  social.providers.length > 4 &&
                    getClassName("kcFormSocialAccountDoubleListClass")
                )}
              >
                {social.providers.map((p) => {
                  let icon;
                  switch (p.providerId) {
                    case "github":
                      icon = githubIcon;
                      break;
                    case "google":
                      icon = googleIcon;
                      break;
                    default:
                      icon = null; // Fallback if no icon is found
                  }

                  return (
                    <li
                      key={p.providerId}
                      className={clsx(
                        "social-container",
                        getClassName("kcFormSocialAccountListLinkClass")
                      )}
                    >
                      <a
                        href={p.loginUrl}
                        id={`zocial-${p.alias}`}
                        className={clsx("zocial")}
                      >
                        {icon && (
                          <img
                            src={icon}
                            alt={p.displayName}
                            className="social-icon"
                          />
                        )}
                        <span>{p.displayName}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </form>
    </Template>
  );
}
