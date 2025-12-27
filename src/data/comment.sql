-- ======================================
-- 1. Users Table
-- ======================================
create table users (
    id serial primary key,
    username varchar(50) not null,
    sex char(1),
    age int
    online boolean
);

-- ======================================
-- 2. Emojis Table
-- ======================================
create table emojis (
    id serial primary key,
    name varchar(20) not null
);

-- ======================================
-- 3. Comments Table
-- ======================================
create table comments (
    id serial primary key,
    parent_id int references comments(id) on delete cascade,  -- allows nested replies
    user_id int not null references users(id) on delete cascade,
    text text not null,
    type_id int references comment_types(id) on delete set null,
    created_at timestamp not null default now()
);
-- *note alter field type 
alter table comments
add column type_id int references comment_types(id) on delete set null;


-- ======================================
-- 4. Comment Reactions Table
-- ======================================
create table comment_reactions (
    id serial primary key,
    comment_id int not null references comments(id) on delete cascade,
    user_id int not null references users(id) on delete cascade,
    emoji_id int not null references emojis(id) on delete cascade,
    unique(comment_id, user_id, emoji_id)  -- prevents duplicate reactions
);

-- ======================================
-- 5. Create Type of comment
-- ======================================

create table comment_types (
    id serial primary key,
    type text not null unique,          -- e.g., "question", "feedback", etc.
    total_use_type int not null default 0
);


-- ======================================
-- 6. Insert Sample Data
-- ======================================

-- Users
insert into users (id, username, sex, age) values
(1, 'userA', 'M', 19),
(2, 'userB', 'F', 19),
(3, 'userC', 'M', 20),
(4, 'userD', 'F', 21);

-- Emojis
insert into emojis (id, name) values
(1, 'love'),
(2, 'like'),
(3, 'angry'),
(4, 'haha'),
(5, 'cry');

-- Comments
insert into comments (id, parent_id, user_id, text, created_at) values
(1, null, 1, 'Comment 1', '2025-12-25T10:00:00Z'),
(2, 1, 2, 'Reply 2 to Comment 1', '2025-12-25T10:05:00Z'),
(3, 2, 1, 'Reply 1 to Reply 2', '2025-12-25T10:10:00Z'),
(4, 2, 4, 'Reply 2 to Reply 2', '2025-12-25T10:15:00Z'),
(5, 4, 2, 'Reply to Reply 4', '2025-12-25T10:20:00Z'),
(6, 4, 1, 'Another reply to Reply 4', '2025-12-25T10:25:00Z'),
(7, 4, 4, 'Another reply to Reply 4', '2025-12-25T10:30:00Z'),
(8, 7, 1, 'Reply to Reply 7', '2025-12-25T10:35:00Z'),
(9, 7, 4, 'Another reply to Reply 7', '2025-12-25T10:40:00Z');

-- Comment Reactions
insert into comment_reactions (comment_id, user_id, emoji_id) values
(1, 2, 1),
(1, 3, 2),
(2, 1, 2),
(4, 2, 4),
(6, 4, 5),
(9, 1, 3);
