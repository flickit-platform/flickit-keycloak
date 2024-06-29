import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import githubIcon from "../assets/github_logo.svg";
import googleIcon from "../assets/google_logo.svg";

const my_custom_param = new URL(window.location.href).searchParams.get(
  "my_custom_param"
);

if (my_custom_param !== null) {
  console.log("my_custom_param:", my_custom_param);
}

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");

    formElement.submit();
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayInfo={
        realm.password && realm.registrationAllowed && !registrationDisabled
      }
      displayWide={realm.password && social.providers !== undefined}
      headerNode={msg("doLogIn")}
      infoNode={
        <div id="kc-registration">
          <span>
            {msg("noAccount")}
            <a tabIndex={6} href={url.registrationUrl}>
              {msg("doRegister")}
            </a>
          </span>
        </div>
      }
    >
      <div
        id="kc-form"
        className={clsx(
          realm.password &&
            social.providers !== undefined &&
            getClassName("kcContentWrapperClass")
        )}
      >
        <div id="kc-form-wrapper">
          {realm.password && (
            <form
              id="kc-form-login"
              onSubmit={onSubmit}
              action={url.loginAction}
              method="post"
            >
              <div className={getClassName("kcFormGroupClass")}>
                {!usernameHidden &&
                  (() => {
                    const label = "email";

                    const autoCompleteHelper: typeof label = label;

                    return (
                      <div className={clsx(getClassName("kcFormGroupClass"))}>
                        <div className={getClassName("kcLabelWrapperClass")}>
                          <label
                            htmlFor={autoCompleteHelper}
                            className={getClassName("kcLabelClass")}
                          >
                            {msg(label)}
                          </label>{" "}
                        </div>

                        <div className={getClassName("kcInputWrapperClass")}>
                          <input
                            tabIndex={1}
                            id={autoCompleteHelper}
                            //NOTE: This is used by Google Chrome auto fill so we use it to tell
                            //the browser how to pre fill the form but before submit we put it back
                            //to username because it is what keycloak expects.
                            name={autoCompleteHelper}
                            defaultValue={login.username ?? ""}
                            type="text"
                            autoFocus={true}
                            autoComplete="off"
                            className={getClassName("kcInputClass")}
                          />
                        </div>
                      </div>
                    );
                  })()}
              </div>
              <div className={getClassName("kcFormGroupClass")}>
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
                    tabIndex={2}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    className={getClassName("kcInputClass")}
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
              <div>
                <div id="kc-form-options" className="input-remember-me">
                  {realm.rememberMe && !usernameHidden && (
                    <div className="checkbox">
                      <label>
                        <input
                          tabIndex={3}
                          id="rememberMe"
                          name="rememberMe"
                          type="checkbox"
                          {...(login.rememberMe === "on"
                            ? {
                                checked: true,
                              }
                            : {})}
                        />
                        {msg("rememberMe")}
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <div id="kc-form-buttons" className="input-buton-container">
                <div className="reset-password-text">
                  {realm.resetPasswordAllowed && (
                    <span>
                      <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                        {msg("doForgotPassword")}
                      </a>
                    </span>
                  )}
                </div>
                <input
                  type="hidden"
                  id="id-hidden-input"
                  name="credentialId"
                  {...(auth?.selectedCredential !== undefined
                    ? {
                        value: auth.selectedCredential,
                      }
                    : {})}
                />
                <input
                  tabIndex={4}
                  className="kcButtonPrimaryClass"
                  name="login"
                  id="kc-login"
                  type="submit"
                  value={msgStr("doLogIn")}
                  disabled={isLoginButtonDisabled}
                />
              </div>
              {realm.password && social.providers !== undefined && (
                <div className="separator">
                  <hr />
                  <span>{msg("continueWithAcountsIn")}</span>
                  <hr />
                </div>
              )}
            </form>
          )}
        </div>
        {realm.password && social.providers !== undefined && (
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
        )}
      </div>
    </Template>
  );
}
