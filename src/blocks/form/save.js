/**
 * External Dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal Dependencies
 */
import { IconDefault } from "../../utils/block-icons";

export default function edit({ attributes, setAttributes }) {
	const { clientid, recipients, mailSubject, anchor } = attributes;

	return (
		<form
			id={anchor ? anchor : null}
			className={classnames("form form--contact")}
			method="post"
			novalidate
		>
			<input type="hidden" name="clientId" value={clientid} />
			<div className="row-wrapper row-wrapper--ct-wd">
				<div className="row row--xs-center row--col-ht row--gap-2">
					<div className="col col--xs-12 col--lg-12 col--pd-0">
						<input type="hidden" name="time" />
						<div className="row row--xs-center row--col-ht row--gap-2">
							<div className="col col--xs-12 col--lg-6 col--pd-0">
								<label for={__("First Name", "epea-theme")} class="form-label">
									{__("First Name", "epea-theme")}
								</label>
								<input
									name="con_name"
									type="text"
									id="con_name"
									class="hide-robot"
								/>
								<input
									type="text"
									class="form-control"
									id="firstname"
									name="firstname"
									autocomplete="off"
									required="required"
								/>
								<div class="error-msg"></div>
							</div>
							<div className="col col--xs-12 col--lg-6 col--pd-0">
								<label for={__("Last name", "epea-theme")} class="form-label">
									{__("Last name", "epea-theme")}
								</label>
								<input
									type="text"
									class="form-control"
									id="lastname"
									name="lastname"
									autocomplete="off"
									required="required"
								/>
								<div class="error-msg"></div>
							</div>
							<div className="col col--xs-12 col--lg-6 col--pd-0">
								<label for={__("Company", "epea-theme")} class="form-label">
									{__("Company", "epea-theme")}
								</label>
								<input
									type="text"
									class="form-control"
									id="company"
									name="company"
									autocomplete="off"
									required="required"
								/>
								<div class="error-msg"></div>
							</div>
							<div className="col col--xs-12 col--lg-6 col--pd-0">
								<label for={__("E-Mail", "epea-theme")} class="form-label">
									{__("E-Mail", "epea-theme")}
								</label>
								<input
									type="email"
									class="form-control"
									id="email"
									name="email"
									autocomplete="off"
									required="required"
								/>
								<div class="error-msg"></div>
							</div>
							<div className="col col--xs-12 col--lg-6 col--pd-0">
								<label for={__("Message", "epea-theme")} class="form-label">
									{__("Message", "epea-theme")}
								</label>
								<textarea
									type="text"
									class="form-control"
									id="message"
									name="message"
									rows="4"
								></textarea>
							</div>
							<div className="col col--xs-12 col--lg-6 col--pd-0">
								<label for={__("Privacy", "epea-theme")} className="acceptance">
									<input
										type="checkbox"
										name="acceptPrivacy"
										value="1"
										required="required"
									/>
									<span class="form-label">
										{__(
											"Yes, I have read the data protection declaration and agree that the data I have provided will be collected and stored electronically.",
											"epea-theme"
										)}
									</span>
								</label>
								<div class="error-msg"></div>
							</div>
						</div>
					</div>
					<div className="col col--xs-12 col--pd-0">
						<label for="submit" className="submit--button button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left">
							<div class="icon icon--bgcolor-five icon--color-two">
								<div class="icon__helper"></div>
								<i class="icon__visual icon-37-epea"></i>
							</div>
							<input
								type="submit"
								value={__("send message", "epea-theme")}
								class=""
								name="submit"
							/>
						</label>
					</div>					
					<div className="col col--xs-12 col--pd-0 response">
						<p className="response-message"></p>
					</div>
				</div>
			</div>
		</form>
	);
}
