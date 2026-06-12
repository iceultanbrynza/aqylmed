from llama_index.core.vector_stores import (MetadataFilters,
                                            MetadataFilter,
                                            FilterOperator,
                                            FilterCondition)

from aiagent.serializers import FilterValue

class FilterService:
    @staticmethod
    def build(filters: list[FilterValue]):
        node_filters = []
        for f in filters:
            if len(f.values) == 1:

                node_filters.append(MetadataFilter(key=f.key,
                                                   value=f.values[0],
                                                   operator=FilterOperator.EQ))
            else:
                node_filters.append(MetadataFilters(filters=[MetadataFilter(key=f.key,
                                                                            value=v,
                                                                            operator=FilterOperator.EQ)
                                                            for v in f.values],
                                                    condition=FilterCondition.OR)
                                    )

        return MetadataFilters(filters=node_filters,
                               condition=FilterCondition.AND)
