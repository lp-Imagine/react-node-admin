import React from "react";
import { Card, Button } from "antd";
import Shuffle from "shufflejs";
import "animate.css";
import TypingCard from "@/components/TypingCard";

const animations = [
  {
    groups: ["Attention Seekers"],
    list: [
      "bounce",
      "flash",
      "pulse",
      "rubberBand",
      "shakeX",
      "shakeY",
      "swing",
      "tada",
      "wobble",
      "jello",
      "heartBeat",
    ],
  },
  {
    groups: ["Bouncing Entrances", "Entrances"],
    list: [
      "bounceIn",
      "bounceInDown",
      "bounceInLeft",
      "bounceInRight",
      "bounceInUp",
    ],
  },
  {
    groups: ["Bouncing Exits", "Exits"],
    list: [
      "bounceOut",
      "bounceOutDown",
      "bounceOutLeft",
      "bounceOutRight",
      "bounceOutUp",
    ],
  },
  {
    groups: ["Fading Entrances", "Entrances"],
    list: [
      "fadeIn",
      "fadeInDown",
      "fadeInDownBig",
      "fadeInLeft",
      "fadeInLeftBig",
      "fadeInRight",
      "fadeInRightBig",
      "fadeInUp",
      "fadeInUpBig",
    ],
  },
  {
    groups: ["Fading Exits", "Exits"],
    list: [
      "fadeOut",
      "fadeOutDown",
      "fadeOutDownBig",
      "fadeOutLeft",
      "fadeOutLeftBig",
      "fadeOutRight",
      "fadeOutRightBig",
      "fadeOutUp",
      "fadeOutUpBig",
    ],
  },
  {
    groups: ["Flippers"],
    list: ["flip", "flipInX", "flipInY", "flipOutX", "flipOutY"],
  },
  {
    groups: ["Lightspeed"],
    list: ["lightSpeedIn", "lightSpeedOut"],
  },
  {
    groups: ["Rotating Entrances", "Entrances"],
    list: [
      "rotateIn",
      "rotateInDownLeft",
      "rotateInDownRight",
      "rotateInUpLeft",
      "rotateInUpRight",
    ],
  },
  {
    groups: ["Rotating Exits", "Exits"],
    list: [
      "rotateOut",
      "rotateOutDownLeft",
      "rotateOutDownRight",
      "rotateOutUpLeft",
      "rotateOutUpRight",
    ],
  },
  {
    groups: ["Sliding Entrances", "Entrances"],
    list: ["slideInUp", "slideInDown", "slideInLeft", "slideInRight"],
  },
  {
    groups: ["Sliding Exits", "Exits"],
    list: ["slideOutUp", "slideOutDown", "slideOutLeft", "slideOutRight"],
  },
  {
    groups: ["Zoom Entrances", "Entrances"],
    list: ["zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp"],
  },
  {
    groups: ["Zoom Exits", "Exits"],
    list: [
      "zoomOut",
      "zoomOutDown",
      "zoomOutLeft",
      "zoomOutRight",
      "zoomOutUp",
    ],
  },
  {
    groups: ["Specials"],
    list: ["hinge", "rollIn", "rollOut", "jackInTheBox"],
  },
];

function getGroups(arr) {
  return arr.map((item) => {
    return item.replace(/\s/g, "");
  });
}

class AnimationDemo extends React.Component {
  componentDidMount() {
    this.shuffle = new Shuffle(this.shuffleDemo, {
      itemSelector: ".shuffle-item",
      sizer: this.sizer,
    });
  }
  componentDidUpdate() {
    this.shuffle.resetItems();
  }
  componentWillUnmount() {
    this.shuffle.destroy();
    this.shuffle = null;
  }
  render() {
    return (
      <div>
        <TypingCard
          title="动画效果"
          source="动态效果animation.css库和shufflejs库"
        />
        <Card bordered={false}>
          <p>
            <Button
              type="primary"
              style={{ margin: "5px 10px" }}
              onClick={() => this.shuffle.filter()}
            >
              全部
            </Button>
            <Button
              type="primary"
              style={{ margin: "5px 10px" }}
              onClick={() => this.shuffle.filter("Entrances")}
            >
              进入
            </Button>
            <Button
              type="primary"
              style={{ margin: "5px 10px" }}
              onClick={() => this.shuffle.filter("Exits")}
            >
              退出
            </Button>
            <br />
            {animations.map((item) => (
              <Button
                key={item.groups}
                onClick={() =>
                  this.shuffle.filter(item.groups[0].replace(/\s/g, ""))
                }
                style={{ margin: "5px 10px" }}
              >
                {item.groups}
              </Button>
            ))}
          </p>
        </Card>
        <div style={styles.box}>
          <div ref={(div) => (this.shuffleDemo = div)}>
            {
              //移入移除函数最好绑定在父元素上，因为父元素不会因为动画效果而移动，如果绑定在h3上，鼠标没有移动，但是h3移动了，鼠标就不在h3中，会触发onMouseLeave事件
              animations.map((item) => {
                return item.list.map((i) => {
                  return (
                    <div
                      className="shuffle-item"
                      style={styles.item}
                      onMouseEnter={(e) =>
                        this[i].classList.add(
                          "animate__animated",
                          `animate__${i}`
                        )
                      }
                      onMouseLeave={(e) =>
                        this[i].classList.remove(
                          "animate__animated",
                          `animate__${i}`
                        )
                      }
                      data-groups={JSON.stringify(getGroups(item.groups))}
                      key={i}
                    >
                      <h3
                        style={styles.title}
                        className="animated"
                        ref={(el) => (this[i] = el)}
                      >
                        {i}
                      </h3>
                    </div>
                  );
                });
              })
            }
            {/*下面的div是为了间隔宽度*/}
            <div
              style={{ width: "8.33333%" }}
              ref={(div) => (this.sizer = div)}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  item: {
    width: "22%",
    marginTop: 16,
    fontWeight: 500,
    border: "1px solid #d9d9d9",
  },
  box: {
    minHeight: 500,
    padding: "10px 32px",
  },
  title: {
    backgroundColor: "#7546C9",
    color:"#fff",
    padding: 40,
    textAlign: "center",
    fontSize: 14,
    margin: 0,
  },
};

export default AnimationDemo;
