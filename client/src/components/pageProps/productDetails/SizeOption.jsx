import React from 'react';
import { Select } from 'antd';

const SizeOption = () => (
    <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Choose size"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
            {
                value: 'S',
                label: 'S',
            },
            {
                value: 'M',
                label: 'M',
            },
            {
                value: 'L',
                label: 'L',
            },
            {
                value: 'XL',
                label: 'XL',
            },
        ]}
    />
);

export default SizeOption;