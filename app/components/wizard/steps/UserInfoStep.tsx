import { Form, Input, Select, Space, Button, Card } from "antd";
import { Icon } from "@iconify/react";
import { useTeamStore } from "../../../store/team.store";

const { Option } = Select;

export const UserInfoStep = () => {
  const {
    leaderName,
    leaderEmail,
    leaderPhone,
    university,
    members,

    setLeader,
    setUniversity,
    addMember,
    updateMember,
    removeMember,
  } = useTeamStore();

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Card title="اطلاعات سرگروه" bordered={false}>
        <Form.Item label="نام و نام خانوادگی سرگروه" required>
          <Input
            size="large"
            value={leaderName}
            onChange={(e) => setLeader({ name: e.target.value })}
            placeholder="نام و نام خانوادگی"
            prefix={<Icon icon="mdi:user" />}
          />
        </Form.Item>

        <Form.Item label="ایمیل سرگروه" required>
          <Input
            size="large"
            value={leaderEmail}
            onChange={(e) => setLeader({ email: e.target.value })}
            placeholder="ایمیل"
            prefix={<Icon icon="mdi:email" />}
          />
        </Form.Item>

        <Form.Item label="شماره تماس" required>
          <Input
            size="large"
            value={leaderPhone}
            onChange={(e) => setLeader({ phone: e.target.value })}
            placeholder="شماره تماس"
            prefix={<Icon icon="mdi:phone" />}
          />
        </Form.Item>
      </Card>

      <Button
        type="primary"
        onClick={addMember}
        disabled={members.length >= 2}
        icon={<Icon icon="mdi:account-plus" />}
      >
        افزودن عضو جدید
      </Button>
      {members.map((member, index) => (
        <Card
          key={index}
          size="small"
          title={`عضو ${index + 1}`}
          extra={
            <Button
              danger
              type="text"
              icon={<Icon icon="mdi:delete" />}
              onClick={() => removeMember(index)}
            />
          }
        >
          <Form.Item label="نام و نام خانوادگی" required>
            <Input
              size="large"
              value={member}
              onChange={(e) => updateMember(index, e.target.value)}
              placeholder="نام و نام خانوادگی"
              prefix={<Icon icon="mdi:user-plus" />}
            />
          </Form.Item>
        </Card>
      ))}

      {/* ------------------------------------------------- */}
      {/*                 انتخاب دانشگاه */}
      {/* ------------------------------------------------- */}
      <Form.Item label="دانشگاه" required>
        <Select
          size="large"
          value={university}
          onChange={setUniversity}
          placeholder="دانشگاه خود را انتخاب کنید"
          suffixIcon={<Icon icon="mdi:chevron-down" />}
        >
          <Option value="org1">سازمان ۱</Option>
          <Option value="org2">سازمان ۲</Option>
          <Option value="org3">سازمان ۳</Option>
        </Select>
      </Form.Item>
    </Space>
  );
};
