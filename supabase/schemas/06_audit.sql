-- Audit Module
-- Defines audit trail for tracking all system changes

CREATE TABLE audit_trails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) NOT NULL,
    action VARCHAR(100) NOT NULL, -- create, update, delete, view, approve, reject
    entity_type VARCHAR(100) NOT NULL, -- inventory, production_order, expense, etc.
    entity_id UUID NOT NULL,
    changes JSONB, -- stores before/after values
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
