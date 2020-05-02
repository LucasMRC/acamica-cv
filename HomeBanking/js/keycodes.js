const buttons = document.querySelectorAll('button.links');

buttons.forEach(button =>
	button.addEventListener('transitionend', function(e) {
		if (e.propertyName !== 'margin-left') return;
		this.classList.remove('hover');
	})
);

window.addEventListener('keyup', e => {
	const keycode = Number(e.keyCode);
	if (keycode < 49 && keycode > 54) return;

	// eslint-disable-next-line default-case
	switch (keycode) {
		case 49:
			buttons[0].classList.add('hover');
			setTimeout(extraerDinero, 600);
			break;
		case 50:
			buttons[1].classList.add('hover');
			setTimeout(depositarDinero, 600);
			break;
		case 51:
			buttons[2].classList.add('hover');
			setTimeout(pagarServicio, 600);
			break;
		case 52:
			buttons[3].classList.add('hover');
			setTimeout(transferirDinero, 600);
			break;
		case 53:
			buttons[4].classList.add('hover');
			setTimeout(cambiarLimiteDeExtraccion, 600);
			break;
		case 54:
			buttons[5].classList.add('hover');
			setTimeout(salir, 600);
			break;
	}
});
