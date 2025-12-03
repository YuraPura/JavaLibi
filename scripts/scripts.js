// Simple site scripts: nav toggle, active links, section reveal
document.addEventListener('DOMContentLoaded', function () {
	var nav = document.getElementById('site-nav');
	var toggle = document.querySelector('.nav-toggle');
	if (toggle && nav) {
		toggle.addEventListener('click', function () {
			nav.classList.toggle('open');
		});

		// Close menu on link click (mobile)
		nav.querySelectorAll('a').forEach(function (a) {
			a.addEventListener('click', function () {
				nav.classList.remove('open');
			});
		});
	}

	// Mark active link based on current path
	try {
		var links = document.querySelectorAll('.nav a');
		var path = location.pathname.split('/').pop() || 'index.html';
		links.forEach(function (a) {
			var href = a.getAttribute('href');
			if (!href) return;
			var hrefName = href.split('/').pop();
			if (hrefName === path) a.classList.add('active');
			else a.classList.remove('active');
		});
	} catch (e) { /* ignore */ }

	// Reveal article sections on scroll
	var sections = document.querySelectorAll('.article__section');
	if ('IntersectionObserver' in window && sections.length) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (ent) {
				if (ent.isIntersecting) {
					ent.target.classList.add('visible');
					io.unobserve(ent.target);
				}
			});
		}, {threshold: 0.12});
		sections.forEach(function (s) { io.observe(s); });
	} else {
		// Fallback: show all
		sections.forEach(function (s) { s.classList.add('visible'); });
	}

	// Highlight code blocks if highlight.js loaded
	try {
		if (window.hljs && typeof hljs.highlightAll === 'function') hljs.highlightAll();
	} catch (e) { /* ignore */ }
});
