slack_robot_manager_robots = [
  //
  // The list of Robots. Specify the following fields:
  //
  // - descript  optional     a description of what this robot does
  // - name      mandatory    the name of the bot, as shown by Slack
  // - tag       optional     the tag attached to the bot, optional, can be used to narrow down the match
  // - trigger   optional     the regex to match messages by non-robots that are sent to the robot
  //

  {
    description: "The BMO robot, a slack workflow robot used at Uber",
    name: /^bmo$/i,
    tag: /^APP$/,
    trigger: /^!w/,
  },

  {
    description: "The Review robot, a slack workflow robot used at Uber",
    name: /^Review my diff$/,
    tag: /^WORKFLOW$/,
  },

]