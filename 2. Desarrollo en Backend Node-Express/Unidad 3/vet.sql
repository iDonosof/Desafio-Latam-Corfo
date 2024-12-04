create table user_type(
	id serial primary key,
	user_type_name text not null
);

create table user_info (
	id serial primary key,
	username text not null,
	password text not null,
	full_name text not null,
	user_type_id int not null,
	last_login date,
	constraint fk_user_type_id foreign key(user_type_id) references user_type(id)
	constraint unique_username unique username
);

create table available_schedule (
	id serial primary key,
	schedule_time time not null,
	user_id int not null,
	constraint fk_user_id foreign key(user_id) references user_info(id)
);

create table booking (
	id serial primary key,
	booking_date date not null,
	booking_time time not null,
	client_id int not null,
	employee_id int not null,
	constraint fk_client_id foreign key(client_id) references user_info(id),
	constraint fk_employee_id foreign key(employee_id) references user_info(id)
);

insert into user_type(user_type_name) values ('Cliente'), ('Peluquero/a'), ('Vetarinario/a');