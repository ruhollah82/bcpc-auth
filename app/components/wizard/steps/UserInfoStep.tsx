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

  const [form] = Form.useForm();

  // Email regex simple validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Phone number regex (basic, adjust as needed)
  const phoneRegex = /^[0-9]{10,15}$/;

  const handleAddMember = () => {
    addMember();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ width: "100%" }}
      initialValues={{
        leaderName,
        leaderEmail,
        leaderPhone,
        university,
        members,
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Card title="عضو اول گروه" bordered={false}>
          <Form.Item
            label="نام و نام خانوادگی"
            name="leaderName"
            rules={[
              {
                required: true,
                message: "لطفا نام و نام خانوادگی را وارد کنید",
              },
            ]}
          >
            <Input
              size="large"
              value={leaderName}
              onChange={(e) => setLeader({ name: e.target.value })}
              placeholder="نام و نام خانوادگی"
              prefix={<Icon icon="mdi:user" />}
            />
          </Form.Item>

          <Form.Item
            label="ایمیل سرگروه"
            name="leaderEmail"
            rules={[
              { required: true, message: "لطفا ایمیل را وارد کنید" },
              {
                pattern: emailRegex,
                message: "ایمیل وارد شده معتبر نیست",
              },
            ]}
          >
            <Input
              size="large"
              value={leaderEmail}
              onChange={(e) => setLeader({ email: e.target.value })}
              placeholder="ایمیل"
              prefix={<Icon icon="mdi:email" />}
            />
          </Form.Item>

          <Form.Item
            label="شماره تماس"
            name="leaderPhone"
            rules={[
              { required: true, message: "لطفا شماره تماس را وارد کنید" },
              {
                pattern: phoneRegex,
                message: "شماره تماس معتبر نیست",
              },
            ]}
          >
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
          onClick={handleAddMember}
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
            <Form.Item
              label="نام و نام خانوادگی"
              name={`member-${index}`}
              rules={[
                {
                  required: true,
                  message: "لطفا نام و نام خانوادگی را وارد کنید",
                },
              ]}
            >
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

        <Form.Item
          label="دانشگاه"
          name="university"
          rules={[
            { required: true, message: "لطفا دانشگاه خود را انتخاب کنید" },
          ]}
        >
          <Select
            size="large"
            value={university}
            onChange={setUniversity}
            placeholder="دانشگاه خود را انتخاب کنید"
            suffixIcon={<Icon icon="mdi:chevron-down" />}
          >
            <Option value="University-of-Birjand">دانشگاه بیرجند</Option>
          </Select>
        </Form.Item>
      </Space>
    </Form>
  );
};
