export interface ServiceDescription {
    name: string
    version: string
    operations: {
        get_product: { url: string }
    }
    services: {
        packages?: {
            config?: {
                package_code_regexp?: string
            }

            operations: {
                package_search: {
                    url: string
                    supported_features?: Array<"price_value_filter" | "departure_date_filter">,
                }
            }
        }
    }
}


/**
 * Define your service description here, you could also make this a function to make it dynamic.
 */
export default <ServiceDescription>{
    name: 'My Service Name',
    version: 'My Version',
    operations: {
        get_product: { url: '/products/:id' }
    }
}
