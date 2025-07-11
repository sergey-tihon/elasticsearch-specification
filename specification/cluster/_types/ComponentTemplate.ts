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

import { AliasDefinition } from '@indices/_types/AliasDefinition'
import { DataStreamLifecycleWithRollover } from '@indices/_types/DataStreamLifecycle'
import { DataStreamOptionsTemplate } from '@indices/_types/DataStreamOptions'
import { IndexSettings } from '@indices/_types/IndexSettings'
import { Dictionary } from '@spec_utils/Dictionary'
import { IndexName, Metadata, Name, VersionNumber } from '@_types/common'
import { TypeMapping } from '@_types/mapping/TypeMapping'

export class ComponentTemplate {
  name: Name
  component_template: ComponentTemplateNode
}

export class ComponentTemplateNode {
  template: ComponentTemplateSummary
  version?: VersionNumber
  /** @doc_id mapping-meta-field */
  _meta?: Metadata
  /*
   * @server_default false
   */
  deprecated?: boolean
}

export class ComponentTemplateSummary {
  /** @doc_id mapping-meta-field */
  _meta?: Metadata
  version?: VersionNumber
  settings?: Dictionary<IndexName, IndexSettings>
  mappings?: TypeMapping
  aliases?: Dictionary<string, AliasDefinition>
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
