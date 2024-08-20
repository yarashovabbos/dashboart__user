import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Form, Upload, message, Select } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useUserStore } from "../../store/store";
import { User } from "../types/User";
import { useTranslation } from "react-i18next";
import axios from "axios";

const UsersTable: React.FC = () => {
  const { 
    users, 
    filteredUsers, 
    fetchUsers, 
    addUser, 
    updateUser, 
    deleteUser, 
    setSearchTerm, 
    setSortField, 
    setSortOrder, 
    getFilteredUsers 
  } = useUserStore();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    getFilteredUsers();
  }, [users, getFilteredUsers]);

  const showModal = (user: User | null) => {
    setCurrentUser(user);
    setIsModalVisible(true);
    if (user && user.profilePicture) {
      setFileList([
        {
          uid: '-1',
          name: 'profilePicture.png',
          status: 'done',
          url: user.profilePicture,
        },
      ]);
    }
  };

  const handleOk = async (values: User) => {
    let profilePictureUrl = currentUser?.profilePicture;

    if (fileList.length > 0 && fileList[0].originFileObj) {
      const formData = new FormData();
      formData.append('file', fileList[0].originFileObj);
      try {
        const uploadResponse = await axios.post("http://localhost:3000/upload", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        profilePictureUrl = uploadResponse.data.url;
      } catch (error) {
        message.error('Failed to upload image');
      }
    }

    if (currentUser) {
      updateUser(currentUser.id, { ...values, profilePicture: profilePictureUrl });
    } else {
      addUser({ ...values, id: String(users.length + 1), profilePicture: profilePictureUrl });
    }
    
    setIsModalVisible(false);
    setCurrentUser(null);
    setFileList([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
    setFileList([]);
  };

  const columns = [
    {
      title: t("ID"),
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: t("First Name"),
      dataIndex: "firstName",
      key: "firstName",
      sorter: true,
    },
    {
      title: t("Last Name"),
      dataIndex: "lastName",
      key: "lastName",
      sorter: true,
    },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: t("Username"),
      dataIndex: "username",
      key: "username",
      sorter: true,
    },
    {
      title: t("Phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("Profile Picture"),
      dataIndex: "profilePicture",
      key: "profilePicture",
      render: (url: string) => (
        url ? <img src={url} alt="Profile" width={50} /> : t("No Image")
      ),
    },
    {
      title: t("Actions"),
      key: "actions",
      render: (_: any, record: User) => (
        <div className="flex space-x-2">
          <Button type="primary" onClick={() => showModal(record)}>
            {t("Edit User")}
          </Button>
          <Button 
            type="primary" 
            danger 
            onClick={() => deleteUser(record.id)}
          >
            {t("Delete")}
          </Button>
        </div>
      ),
    },
  ];

  const uploadProps = {
    onRemove: (file: any) => {
      setFileList((prev) => {
        const index = prev.indexOf(file);
        const newFileList = prev.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (file: any) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <Select defaultValue="en" onChange={handleLanguageChange} style={{ marginBottom: 16 }}>
        <Select.Option value="en">English</Select.Option>
        <Select.Option value="ru">Русский</Select.Option>
        <Select.Option value="uz">O'zbek</Select.Option>
      </Select>

      <Input.Search 
        placeholder={t("Search users")} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{ marginBottom: 16 }}
      />

      <Button 
        type="primary" 
        onClick={() => showModal(null)} 
        style={{ marginBottom: 16 }}
      >
        {t("Add User")}
      </Button>

      <Table 
        columns={columns} 
        dataSource={filteredUsers} 
        rowKey="id" 
        onChange={(_pagination, _filters, sorter: any) => {
          setSortField(sorter.field);
          setSortOrder(sorter.order);
        }}
      />

      <Modal 
        title={currentUser ? t("Edit User") : t("Add User")} 
        visible={isModalVisible} 
        onCancel={handleCancel} 
        footer={null}
      >
        <Form
          initialValues={currentUser || {}}
          onFinish={handleOk}
        >
          <Form.Item 
            name="firstName" 
            label={t("First Name")} 
            rules={[{ required: true, message: t("Please input the first name!") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="lastName" 
            label={t("Last Name")} 
            rules={[{ required: true, message: t("Please input the last name!") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="email" 
            label={t("Email")} 
            rules={[{ required: true, message: t("Please input the email!") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="username" 
            label={t("Username")} 
            rules={[{ required: true, message: t("Please input the username!") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="phone" 
            label={t("Phone")} 
            rules={[{ required: true, message: t("Please input the phone number!") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="profilePicture" 
            label={t("Profile Picture")}
          >
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>{t("Click to Upload")}</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentUser ? t("Update") : t("Add User")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersTable;
