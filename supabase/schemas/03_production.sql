-- Production Module
-- Defines products, production orders, material requisitions, and WIP tracking

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    description TEXT,
    unit VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE production_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(100) UNIQUE NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL, -- pending, in-progress, completed, cancelled
    start_date DATE,
    end_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE material_requisitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requisition_number VARCHAR(100) UNIQUE NOT NULL,
    production_order_id UUID REFERENCES production_orders(id) NOT NULL,
    status VARCHAR(50) NOT NULL, -- pending, approved, rejected
    requested_by UUID REFERENCES users(id) NOT NULL,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE material_requisition_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    material_requisition_id UUID REFERENCES material_requisitions(id) ON DELETE CASCADE NOT NULL,
    inventory_id UUID REFERENCES inventory(id) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    issued_quantity DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE work_in_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    production_order_id UUID REFERENCES production_orders(id) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    stage VARCHAR(100),
    notes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE finished_goods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    production_order_id UUID REFERENCES production_orders(id) NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    quality_status VARCHAR(50), -- passed, failed, pending
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
