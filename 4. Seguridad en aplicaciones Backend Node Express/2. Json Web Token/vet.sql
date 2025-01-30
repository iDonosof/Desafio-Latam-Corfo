create table Credential (
	id serial primary key,
	username varchar(100) not null,
	password text not null,
	last_login timestamp
);

create table Client (
	id serial primary key,
	first_name varchar(100) not null,
	last_name varchar(100) not null,
	email varchar(100) not null,
	phone_number varchar(100) not null,
	credentials_id int not null,
	constraint fk_credentials_id foreign key(credentials_id) references Credentials(id)
)

create table Category (
	id serial primary key,
	category_name varchar(100) not null
);

create table Product (
	id serial primary key,
	product_name varchar(100) not null,
	product_description text not null,
	product_price decimal not null,
	category_id int not null,
	constraint fk_category_id foreign key(category_id) references Category(id)
);

create table Sale (
	id serial primary key,
	sale_date date not null,
	sale_time time not null,
	sale_total decimal,
	client_id int not null,
	constraint fk_client_id foreign key(client_id) references Client(id)
);

create table ProductSold (
	id serial primary key,
	quantity int not null,
	unit_price decimal not null,
	product_id int not null,
	sale_id int not null,
	constraint fk_product_id foreign key(product_id) references Product(id),
	constraint fk_sale_id foreign key(sale_id) references Sale(id)
);

/*create table EmployeeType (
	id serial primary key,
	type_name varchar(100) not null
)

create table Employee (
	id serial primary key,
	first_name varchar(100) not null,
	last_name varchar(100) not null,
	email varchar(100) not null,
	phone_number varchar(100) not null,
	credentials_id int not null,
	employee_type_id int not null,
	constraint fk_credentials_id foreign key(credentials_id) references Credentials(id),
	constraint fk_employee_type_id foreign key(employee_type_id) references EmployeeType(id)
)

create table Service (
	id serial primary key,
	service_name varchar(100) not null,
	service_description text not null,
	service_price decimal not null
);

create table ReservationsAvailable (
	id serial primary key,
	schedule_time time not null,
	employee_id int not null,
	service_id int not null,
	constraint fk_employee_id foreign key(employee_id) references Employee(id),
	constraint fk_service_id foreign key(service_id) references Service(id),
	constraint unique_schedule_time_employee_id unique(schedule_time, employee_id)
);

create table Booking (
	id serial primary key,
	booking_date date not null,
	booking_time time not null,
	client_id int not null,
	employee_id int not null,
	service_id int not null,
	constraint fk_client_id foreign key(client_id) references Client(id),
	constraint fk_employee_id foreign key(employee_id) references Employee(id),
	constraint fk_service_id foreign key(service_id) references Service(id),
	constraint unique_booking_date_booking_time_employee_id unique(booking_date, booking_time, employee_id)
);/*