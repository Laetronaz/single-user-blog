import React, { Component } from "react";
import { Table, Input, Button, Icon, Spin } from "antd";
import Highlighter from "react-highlight-words";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { POSTS_QUERY } from "../querries/posts";

function getActions(id) {
  return (
    <div>
      <Link to={`/posts/${id}`}>
        <Icon type="eye" />
      </Link>
      &nbsp;
      <Link to={`/posts/edit/${id}`}>
        <Icon type="edit" />
      </Link>
      &nbsp;
      <Link to={`/posts/delete/${id}`}>
        <Icon type="delete" />
      </Link>
    </div>
  );
}

export default class ManagePosts extends Component {
  state = {
    searchText: ""
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Post ID",
        dataIndex: "id",
        key: "id",
        width: "6%",
        ...this.getColumnSearchProps("id")
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: "20%",
        ...this.getColumnSearchProps("title")
      },
      {
        title: "Body",
        dataIndex: "body",
        key: "body",
        width: "20%",
        ...this.getColumnSearchProps("body")
      },
      {
        title: "Actions",
        dataIndex: "action",
        key: "action",
        width: "8%"
      }
    ];
    return (
      <Query query={POSTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div className="spin">
                <Spin tip="Loading..." size="large" />
              </div>
            );
          if (error) console.log(error);

          const posts = [];
          for (const [key, value] of Object.entries(data.posts)) {
            value.action = getActions(value.id);
            posts.push(value);
          }
          return (
            <Table
              columns={columns}
              dataSource={posts}
              rowKey={posts => posts.id}
            />
          );
        }}
      </Query>
    );
  }
}
