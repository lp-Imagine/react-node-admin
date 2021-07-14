import React, { useState } from "react";
import TypingCard from "@/components/TypingCard";
import { Cascader, Row, Col, Card, Checkbox, Button, Divider } from "antd";

class SelectDemo extends React.Component {
  state = {
    text: "江西省, 南昌市, 红谷滩区",
  };
  render() {
    //**Cascader级联选择 */
    const CascaderComponent = (props) => {
      const options = [
        {
          value: "jiangxi",
          label: "江西省",
          children: [
            {
              value: "nanchang",
              label: "南昌市",
              children: [
                {
                  value: "donghu",
                  label: "东湖区",
                },
                {
                  value: "honggutan",
                  label: "红谷滩区",
                },
                {
                  value: "qingshanhu",
                  label: "青山湖区",
                },
              ],
            },
          ],
        },
        {
          value: "jiangsu",
          label: "江苏省",
          children: [
            {
              value: "nanjing",
              label: "苏州市",
              children: [
                {
                  value: "huqiu",
                  label: "虎丘区",
                },
              ],
            },
          ],
        },
      ];
      const CitySwitcher = () => {
        const cityOnChange = (value, selectedOptions) => {
          this.setState({
            text: selectedOptions.map((o) => o.label).join(", "),
          });
        };
        return (
          <span>
            {props.text}
            &nbsp;
            <Cascader options={options} onChange={cityOnChange}>
              <a href="#">Select</a>
            </Cascader>
          </span>
        );
      };

      const onChange = (value) => {
        console.log(value);
      };
      const displayRender = (label) => {
        return label[label.length - 1];
      };
      function handleAreaClick(e, label, option) {
        e.stopPropagation();
        console.log("clicked", label, option);
      }

      const displayRender2 = (labels, selectedOptions) =>
        labels.map((label, i) => {
          const option = selectedOptions[i];
          if (i === labels.length - 1) {
            return (
              <span key={option.value}>
                {label} (
                <a onClick={(e) => handleAreaClick(e, label, option)}>
                  {option.code || "自定义"}
                </a>
                )
              </span>
            );
          }
          return <span key={option.value}>{label} / </span>;
        });
      const cardContentCascader = `<ul><li>需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。</li>
      <li>从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。</li>
      <li>比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。</li></ul>`;
      return (
        <Col span={12}>
          <Card hoverable bordered={false}>
            <TypingCard title="Cascader级联选择" source={cardContentCascader} />
            <label htmlFor="基本用法：">基本用法：</label>
            <Cascader
              style={{ marginRight: 10, marginBottom: 20 }}
              options={options}
              onChange={onChange}
              placeholder="请选择"
            />
            <label htmlFor="默认值：">默认值：</label>
            <Cascader
              style={{ marginRight: 10, marginBottom: 20 }}
              defaultValue={["jiangxi", "nanchang", "honggutan"]}
              options={options}
              onChange={onChange}
            />
            <br />
            <label>自定义显示：</label>
            <CitySwitcher />
            <br />
            <label>移入展开：</label>
            <Cascader
              style={{ margin: 20 }}
              options={options}
              expandTrigger="hover"
              displayRender={displayRender}
              onChange={onChange}
            />
            <br />
            <label>大小：</label>
            <br />
            <Cascader size="large" options={options} onChange={onChange} />
            <br />
            <br />
            <Cascader options={options} onChange={onChange} />
            <br />
            <br />
            <Cascader size="small" options={options} onChange={onChange} />
            <br />
            <br />
            <label>选择即刻改变值：</label>
            <Cascader
              style={{ margin: 20 }}
              options={options}
              onChange={onChange}
              changeOnSelect
            />
            <br />
            <label>自定义选项框值：</label>
            <Cascader
              options={options}
              defaultValue={["jiangxi", "nanchang", "honggutan"]}
              displayRender={displayRender2}
              style={{ width: "80%" }}
            />
          </Card>
        </Col>
      );
    };
    //**CheckBox 多选 */
    const CheckBoxComponent = (props) => {
      const [checked, setChecked] = useState(true);
      const [disabled, setDisable] = useState(false);
      const [checkedList, setCheckedList] = useState([]);
      const [indeterminate, setIndeterminate] = useState(false);
      const [checkAll, setCheckAll] = useState(false);
      const onChange = (e) => {
        // console.log(`checked = ${e.target.checked}`);
      };
      const toggleChecked = () => {
        setChecked(!checked);
      };

      const toggleDisable = () => {
        setDisable(!disabled);
      };

      const onChange2 = (e) => {
        console.log("checked = ", e.target.checked);
        setChecked(e.target.checked);
      };
      const label = `${checked ? "Checked" : "Unchecked"}-${
        disabled ? "Disabled" : "Enabled"
      }`;

      const plainOptions = ["Apple", "Pear", "Orange"];
      const options = [
        { label: "Apple", value: "Apple" },
        { label: "Pear", value: "Pear" },
        { label: "Orange", value: "Orange" },
      ];
      const optionsWithDisabled = [
        { label: "Apple", value: "Apple" },
        { label: "Pear", value: "Pear" },
        { label: "Orange", value: "Orange", disabled: false },
      ];
      const onChange3 = (list) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
      };

      const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
      };
      const cardContentCheckBox = `在一组可选项中进行多项选择时；单独使用可以表示两种状态之间的切换，和 switch 类似。区别在于切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。`;
      return (
        <Col span={12}>
          <Card hoverable bordered={false}>
            <TypingCard title="Checkbox多选框" source={cardContentCheckBox} />
            <Checkbox onChange={onChange} style={{ margin: 15 }}>
              Checkbox
            </Checkbox>
            <br />
            <Checkbox defaultChecked={false} disabled />
            <Checkbox defaultChecked disabled />
            <br />
            <div style={{ margin: 15 }}>
              <p style={{ marginBottom: "20px" }}>
                <Checkbox
                  checked={checked}
                  disabled={disabled}
                  onChange={onChange2}
                >
                  {label}
                </Checkbox>
              </p>
              <p>
                <Button type="primary" size="small" onClick={toggleChecked}>
                  {!checked ? "Check" : "Uncheck"}
                </Button>
                <Button
                  style={{ margin: "0 10px" }}
                  type="primary"
                  size="small"
                  onClick={toggleDisable}
                >
                  {!disabled ? "Disable" : "Enable"}
                </Button>
              </p>
            </div>
            <Checkbox.Group
              options={plainOptions}
              defaultValue={["Apple"]}
              onChange={onChange}
            />
            <br />
            <br />
            <Checkbox.Group
              options={options}
              defaultValue={["Pear"]}
              onChange={onChange}
            />
            <br />
            <br />
            <Checkbox.Group
              options={optionsWithDisabled}
              disabled
              defaultValue={["Apple"]}
              onChange={onChange}
            />
            <br />
            <Checkbox.Group
              style={{ width: "100%", margin: "15px" }}
              onChange={onChange}
            >
              <Row>
                <Col span={8}>
                  <Checkbox value="A">A</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="B">B</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="C">C</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="D">D</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="E">E</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
            <div style={{ width: "100%", margin: "15px" }}>
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                全选
              </Checkbox>
              <Divider />
              <Checkbox.Group
                options={plainOptions}
                value={checkedList}
                onChange={onChange3}
              />
            </div>
          </Card>
        </Col>
      );
    };

    return (
      <div style={{ padding: 24 }}>
        <Row gutter={20}>
          <CascaderComponent text={this.state.text} />
          <CheckBoxComponent />
        </Row>
      </div>
    );
  }
}

export default SelectDemo;
