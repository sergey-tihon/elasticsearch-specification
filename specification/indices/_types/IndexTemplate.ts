/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { DataStreamLifecycleWithRollover } from '@indices/_types/DataStreamLifecycle'
import { DataStreamOptionsTemplate } from '@indices/_types/DataStreamOptions'
import { Dictionary } from '@spec_utils/Dictionary'
import { IndexName, Metadata, Name, Names, VersionNumber } from '@_types/common'
import { TypeMapping } from '@_types/mapping/TypeMapping'
import { long } from '@_types/Numeric'
import { Alias } from './Alias'
import { IndexSettings } from './IndexSettings'

export class IndexTemplate {
  /**
   * Name of the index template.
   */
  index_patterns: Names
  /**
   * An ordered list of component template names.
   * Component templates are merged in the order specified, meaning that the last component template specified has the highest precedence.
   */
  composed_of: Name[]
  /**
   * Template to be applied.
   * It may optionally include an `aliases`, `mappings`, or `settings` configuration.
   */
  template?: IndexTemplateSummary
  /**
   * Version number used to manage index templates externally.
   * This number is not automatically generated by Elasticsearch.
   */
  version?: VersionNumber
  /**
   * Priority to determine index template precedence when a new data stream or index is created.
   * The index template with the highest priority is chosen.
   * If no priority is specified the template is treated as though it is of priority 0 (lowest priority).
   * This number is not automatically generated by Elasticsearch.
   */
  priority?: long
  /**
   * Optional user metadata about the index template. May have any contents.
   * This map is not automatically generated by Elasticsearch.
   * @doc_id mapping-meta-field */
  _meta?: Metadata
  allow_auto_create?: boolean
  /**
   * If this object is included, the template is used to create data streams and their backing indices.
   * Supports an empty object.
   * Data streams require a matching index template with a `data_stream` object.
   */
  data_stream?: IndexTemplateDataStreamConfiguration
  /**
   * Marks this index template as deprecated.
   * When creating or updating a non-deprecated index template that uses deprecated components,
   * Elasticsearch will emit a deprecation warning.
   * @availability stack since=8.12.0
   * @availability serverless
   */
  deprecated?: boolean
  /**
   * A list of component template names that are allowed to be absent.
   * @availability stack since=8.7.0
   * @availability serverless
   */
  ignore_missing_component_templates?: Names
}

export class IndexTemplateDataStreamConfiguration {
  /**
   * If true, the data stream is hidden.
   * @server_default false
   */
  hidden?: boolean
  /**
   * If true, the data stream supports custom routing.
   * @server_default false
   */
  allow_custom_routing?: boolean
}

export class IndexTemplateSummary {
  /**
   * Aliases to add.
   * If the index template includes a `data_stream` object, these are data stream aliases.
   * Otherwise, these are index aliases.
   * Data stream aliases ignore the `index_routing`, `routing`, and `search_routing` options.
   */
  aliases?: Dictionary<IndexName, Alias>
  /**
   * Mapping for fields in the index.
   * If specified, this mapping can include field names, field data types, and mapping parameters.
   */
  mappings?: TypeMapping
  /**
   * Configuration options for the index.
   */
  settings?: IndexSettings
  /**
   * @availability stack since=8.11.0 stability=stable
   * @availability serverless stability=stable
   */
  lifecycle?: DataStreamLifecycleWithRollover
  /**
   * @availability stack since=8.19.0 stability=stable
   * @availability serverless stability=stable
   */
  data_stream_options?: DataStreamOptionsTemplate | null
}
