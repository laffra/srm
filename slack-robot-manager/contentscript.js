(function SlackRobotManager() {
    const ICON_SHOW_ROBOTS = "https://chrislaffra.com/srm/showrobots.png";
    const ICON_HIDE_ROBOTS = "https://chrislaffra.com/srm/hiderobots.png";
    const ROBOTS = slack_robot_manager_robots.map(function (robot) { return robot["name"] + robot["tag"] });

    let hideRobots = true;

    function debug(s) {
        console.log("##slack-robot-manager##", s);
    }

    function toggle() {
        $(this).css({
            height: hideRobots ? "0px" : "",
            overflow: "hidden"
        });
    }

    function toggleBotInstruction() {
        if ($(this).text().startsWith("!w")) {
            $(this).closest(".c-virtual_list__item").each(toggle);
        }
    }

    function toggleAppBadge() {
        const text = $(this).parent().parent().text();
        if (ROBOTS.indexOf(text) !== -1) {
            let item = $(this).closest(".c-virtual_list__item");
            do {
                item.each(toggle);
                item = item.next();
            } while (item.length && !item.find(".c-avatar").length);
        }
    }

    function run() {
        try {
            $(".c-app_badge").each(toggleAppBadge);
            $(".p-rich_text_section").each(toggleBotInstruction);
            addToggle();
            debug("run")
        } catch (e) {
            debug("Error: " + e)
        }
    }

    function addToggle() {
        const navbar = $(".p-classic_nav__model__buttons.p-classic_nav__no_drag");
        const toggle = $("#slack-robot-manager-toggle");

        if (toggle.length !== 0) {
            return;
        }
        debug("add toggle")
        navbar.append(
            $("<button class='c-button-unstyled p-classic_nav__model__button' type='button' data-qa='channel_header_settings_button' aria-label='Settings for channel devpod-team' delay='150' aria-haspopup='true'>")
                .attr("id", "slack-robot-manager-toggle")
                .click(function () {
                    hideRobots = !hideRobots;
                    $(this).css("backgroundImage", "url('" + (hideRobots ? ICON_HIDE_ROBOTS : ICON_SHOW_ROBOTS) + "')");
                    run();
                })
                .css({
                    width: "32px",
                    height: "32px",
                    backgroundImage: "url('" + (hideRobots ? ICON_HIDE_ROBOTS : ICON_SHOW_ROBOTS) + "')",
                }));
    }

    function setupTimer() {
        var timer = setTimeout(function() { }, 1);
        function startTimer() {
            clearTimeout(timer);
            timer = setTimeout(run, 1);
        }
        document.body.addEventListener('DOMSubtreeModified', startTimer);
    }

    setupTimer()
    run();
})();
