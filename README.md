# single-user-blog

A single user blog for my personal use as my last blog wasn't quite to my liking I'm trying to build this new one with a bit of fresh technologies. Such as Node, Express, GraphQL and React. I'll also be redoing the comments to make it login-free and without a third party resource.

## Database Queries

```
    CREATE DATABASE blog_api
	CHARACTER SET utf8
	COLLATE utf8_general_ci;

    CREATE TABLE blog_api.category (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        image VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        last_updated TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
        active TINYINT(1) NOT NULL DEFAULT 1,
        PRIMARY KEY (id)
    )
    ENGINE = INNODB,
    CHARACTER SET utf8,
    COLLATE utf8_general_ci;

    ALTER TABLE blog_api.category
        ADD UNIQUE INDEX name(name);

    CREATE TABLE blog_api.tag (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
    )
    ENGINE = INNODB,
    CHARACTER SET utf8,
    COLLATE utf8_general_ci;

    ALTER TABLE blog_api.tag
        ADD UNIQUE INDEX name(name);

    CREATE TABLE blog_api.post (
        id INT(11) NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        body VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        last_updated TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
        category_id INT(11) DEFAULT NULL,
        PRIMARY KEY (id)
    )
    ENGINE = INNODB,
    CHARACTER SET utf8,
    COLLATE utf8_general_ci;

    ALTER TABLE blog_api.post
        ADD CONSTRAINT fk_category FOREIGN KEY (category_id)
            REFERENCES blog_api.category(id) ON DELETE CASCADE;

    CREATE TABLE blog_api.posttag (
        id INT(11) NOT NULL AUTO_INCREMENT,
        post_id INT(11) NOT NULL,
        tag_id INT(11) NOT NULL,
        PRIMARY KEY (id)
    )
    ENGINE = INNODB,
    CHARACTER SET utf8,
    COLLATE utf8_general_ci;

    ALTER TABLE blog_api.posttag
        ADD CONSTRAINT fk_post FOREIGN KEY (post_id)
            REFERENCES blog_api.post(id) ON DELETE CASCADE;

    ALTER TABLE blog_api.posttag
        ADD CONSTRAINT fk_tag FOREIGN KEY (tag_id)
            REFERENCES blog_api.tag(id) ON DELETE CASCADE;
```
