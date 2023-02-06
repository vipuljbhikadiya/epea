function headlineClasses(attributes) {
	const { xlwidth, lgwidth, mdwidth } = attributes;

	let headlineClasses = '';

	//IF MD is set ---------------------------------------------------------
	if (mdwidth != 0) {

		headlineClasses += ' col--md-' + mdwidth;

	}

	//IF LG is set ---------------------------------------------------------
	if (lgwidth != 0) {
		//IF MD is set
		if (mdwidth != 0) {
			//IF LG is unequal MD
			if (lgwidth != mdwidth) {
				headlineClasses += ' col--lg-' + lgwidth;
			}
		}

		//IF MD is notset
		else {

			headlineClasses += ' col--lg-' + lgwidth;

		}
	}

	//IF XL is set ---------------------------------------------------------
	if (xlwidth != 0) {
		//IF LG is set
		if (lgwidth != 0) {
			//IF XL is unequal LG
			if (xlwidth != lgwidth) {
				headlineClasses += ' col--xl-' + xlwidth;
			}
		}

		//IF LG is notset
		else {
			//IF MD is set
			if (mdwidth != 0) {
				//IF XL is unequal MD
				if (xlwidth != mdwidth) {
					headlineClasses += ' col--xl-' + xlwidth;
				}
			}

			//IF MD is notset
			else {

				headlineClasses += ' col--xl-' + xlwidth;

			}
		}
	}

	return [headlineClasses];
}
export default headlineClasses;
