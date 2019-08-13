import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form, Input, Button, Typography, Row, Col } from "antd";

const { Title } = Typography;

function EditTitle() {
  return <Title level={1}>Edit Post </Title>;
}

function NewTitle() {
  return <Title level={1}>Create New Post</Title>;
}

export default function PostForm({ post }) {
  let formTitle, ckEditorData, postTitle;
  if (post !== undefined) {
    formTitle = EditTitle();
    postTitle = post.title;
    ckEditorData = post.body;
  } else {
    formTitle = NewTitle();
    postTitle = "";
    ckEditorData = "<p>Enter your text here</p>";
  }

  return (
    <div>
      {formTitle}
      <Row align="top" justify="space-around">
        <Col span={18} offset={1}>
          <Form>
            <Form.Item />

            <Form.Item label="Post Title">
              <Input
                placeholder="Post Title"
                id="post-title"
                allowClear
                value={postTitle}
              />
            </Form.Item>
            <Form.Item label="Post Body">
              <CKEditor
                editor={ClassicEditor}
                data={ckEditorData}
                onInit={editor => {}}
                onChange={(event, editor) => {
                  ckEditorData = editor.getData();
                  console.log(ckEditorData);
                }}
                onBlur={editor => {}}
                onFocus={editor => {}}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
