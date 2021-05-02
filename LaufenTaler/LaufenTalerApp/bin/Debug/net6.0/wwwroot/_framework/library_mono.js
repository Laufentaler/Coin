// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

/**
 * @typedef WasmId
 * @type {object}
 * @property {string} idStr - full object id string
 * @property {string} scheme - eg, object, valuetype, array ..
 * @property {string} value - string part after `dotnet:scheme:` of the id string
 * @property {object} o - value parsed as JSON
 */

/**
 * @typedef WasmRoot - a single address in the managed heap, visible to the GC
 * @type {object}
 * @property {ManagedPointer} value - pointer into the managed heap, stored in the root
 * @property {function} get_address - retrieves address of the root in wasm memory
 * @property {function} get - retrieves pointer value
 * @property {function} set - updates the pointer
 * @property {function} release - releases the root storage for future use
 */

/**
 * @typedef WasmRootBuffer - a collection of addresses in the managed heap, visible to the GC
 * @type {object}
 * @property {number} length - number of elements the root buffer can hold
 * @property {function} get_address - retrieves address of an element in wasm memory, by index
 * @property {function} get - retrieves an element by index
 * @property {function} set - sets an element's value by index
 * @property {function} release - releases the root storage for future use
 */

/**
 * @typedef ManagedPointer
 * @type {number} - address in the managed heap
 */

/**
 * @typedef NativePointer
 * @type {number} - address in wasm memory
 */

/**
 * @typedef Event
 * @type {object}
 * @property {string} eventName - name of the event being raised
 * @property {object} eventArgs - arguments for the event itself
 */

var MonoSupportLib = {
	$MONO__postset: 'MONO.export_functions (Module);',
	$MONO: {
		pump_count: 0,
		timeout_queue: [],
		_vt_stack: [],
		mono_wasm_runtime_is_ready : false,
		mono_wasm_ignore_pdb_load_errors: true,

		/** @type {object.<string, object>} */
		_id_table: {},

		pump_message: function () {
			if (!this.mono_background_exec)
				this.mono_background_exec = Module.cwrap ("mono_background_exec", null);
			while (MONO.timeout_queue.length > 0) {
				--MONO.pump_count;
				MONO.timeout_queue.shift()();
			}
			while (MONO.pump_count > 0) {
				--MONO.pump_count;
				this.mono_background_exec ();
			}
		},

		export_functions: function (module) {
			module ["pump_message"] = MONO.pump_message.bind(MONO);
			module ["mono_load_runtime_and_bcl"] = MONO.mono_load_runtime_and_bcl.bind(MONO);
			module ["mono_load_runtime_and_bcl_args"] = MONO.mono_load_runtime_and_bcl_args.bind(MONO);
			module ["mono_wasm_load_bytes_into_heap"] = MONO.mono_wasm_load_bytes_into_heap.bind(MONO);
			module ["mono_wasm_load_icu_data"] = MONO.mono_wasm_load_icu_data.bind(MONO);
			module ["mono_wasm_get_icudt_name"] = MONO.mono_wasm_get_icudt_name.bind(MONO);
			module ["mono_wasm_globalization_init"] = MONO.mono_wasm_globalization_init.bind(MONO);
			module ["mono_wasm_get_loaded_files"] = MONO.mono_wasm_get_loaded_files.bind(MONO);
			module ["mono_wasm_new_root_buffer"] = MONO.mono_wasm_new_root_buffer.bind(MONO);
			module ["mono_wasm_new_root_buffer_from_pointer"] = MONO.mono_wasm_new_root_buffer_from_pointer.bind(MONO);
			module ["mono_wasm_new_root"] = MONO.mono_wasm_new_root.bind(MONO);
			module ["mono_wasm_new_roots"] = MONO.mono_wasm_new_roots.bind(MONO);
			module ["mono_wasm_release_roots"] = MONO.mono_wasm_release_roots.bind(MONO);
		},

		_base64Converter: {
			// Code from JSIL:
			// https://github.com/sq/JSIL/blob/1d57d5427c87ab92ffa3ca4b82429cd7509796ba/JSIL.Libraries/Includes/Bootstrap/Core/Classes/System.Convert.js#L149
			// Thanks to Katelyn Gadd @kg

			_base64Table: [
				'A', 'B', 'C', 'D',
				'E', 'F', 'G', 'H',
				'I', 'J', 'K', 'L',
				'M', 'N', 'O', 'P',
				'Q', 'R', 'S', 'T',
				'U', 'V', 'W', 'X',
				'Y', 'Z',
				'a', 'b', 'c', 'd',
				'e', 'f', 'g', 'h',
				'i', 'j', 'k', 'l',
				'm', 'n', 'o', 'p',
				'q', 'r', 's', 't',
				'u', 'v', 'w', 'x',
				'y', 'z',
				'0', '1', '2', '3',
				'4', '5', '6', '7',
				'8', '9',
				'+', '/'
			],

			_makeByteReader: function (bytes, index, count) {
				var position = (typeof (index) === "number") ? index : 0;
				var endpoint;

				if (typeof (count) === "number")
					endpoint = (position + count);
				else
					endpoint = (bytes.length - position);

				var result = {
					read: function () {
						if (position >= endpoint)
							return false;

						var nextByte = bytes[position];
						position += 1;
						return nextByte;
					}
				};

				Object.defineProperty(result, "eof", {
					get: function () {
						return (position >= endpoint);
					},
					configurable: true,
					enumerable: true
				});

				return result;
			},

			toBase64StringImpl: function (inArray, offset, length) {
				var reader = this._makeByteReader(inArray, offset, length);
				var result = "";
				var ch1 = 0, ch2 = 0, ch3 = 0, bits = 0, equalsCount = 0, sum = 0;
				var mask1 = (1 << 24) - 1, mask2 = (1 << 18) - 1, mask3 = (1 << 12) - 1, mask4 = (1 << 6) - 1;
				var shift1 = 18, shift2 = 12, shift3 = 6, shift4 = 0;

				while (true) {
					ch1 = reader.read();
					ch2 = reader.read();
					ch3 = reader.read();

					if (ch1 === false)
						break;
					if (ch2 === false) {
						ch2 = 0;
						equalsCount += 1;
					}
					if (ch3 === false) {
						ch3 = 0;
						equalsCount += 1;
					}

					// Seems backwards, but is right!
					sum = (ch1 << 16) | (ch2 << 8) | (ch3 << 0);

					bits = (sum & mask1) >> shift1;
					result += this._base64Table[bits];
					bits = (sum & mask2) >> shift2;
					result += this._base64Table[bits];

					if (equalsCount < 2) {
						bits = (sum & mask3) >> shift3;
						result += this._base64Table[bits];
					}

					if (equalsCount === 2) {
						result += "==";
					} else if (equalsCount === 1) {
						result += "=";
					} else {
						bits = (sum & mask4) >> shift4;
						result += this._base64Table[bits];
					}
				}

				return result;
			},
		},

		_mono_wasm_root_buffer_prototype: {
			_throw_index_out_of_range: function () {
				throw new Error ("index out of range");
			},
			_check_in_range: function (index) {
				if ((index >= this.__count) || (index < 0))
					this._throw_index_out_of_range();
			},
			/** @returns {NativePointer} */
			get_address: function (index) {
				this._check_in_range (index);
				return this.__offset + (index * 4);
			},
			/** @returns {number} */
			get_address_32: function (index) {
				this._check_in_range (index);
				return this.__offset32 + index;
			},
			/** @returns {ManagedPointer} */
			get: function (index) {
				this._check_in_range (index);
				return Module.HEAP32[this.get_address_32 (index)];
			},
			set: function (index, value) {
				Module.HEAP32[this.get_address_32 (index)] = value;
				return value;
			},
			_unsafe_get: function (index) {
				return Module.HEAP32[this.__offset32 + index];
			},
			_unsafe_set: function (index, value) {
				Module.HEAP32[this.__offset32 + index] = value;
			},
			clear: function () {
				if (this.__offset)
					MONO._zero_region (this.__offset, this.__count * 4);
			},
			release: function () {
				if (this.__offset && this.__ownsAllocation) {
					MONO.mono_wasm_deregister_root (this.__offset);
					MONO._zero_region (this.__offset, this.__count * 4);
					Module._free (this.__offset);
				}

				this.__handle = this.__offset = this.__count = this.__offset32 = 0;
			},
			toString: function () {
				return "[root buffer @" + this.get_address (0) + ", size " + this.__count + "]";
			}
		},

		_scratch_root_buffer: null,
		_scratch_root_free_indices: null,
		_scratch_root_free_indices_count: 0,
		_scratch_root_free_instances: [],

		_mono_wasm_root_prototype: {
			/** @returns {NativePointer} */
			get_address: function () {
				return this.__buffer.get_address (this.__index);
			},
			/** @returns {number} */
			get_address_32: function () {
				return this.__buffer.get_address_32 (this.__index);
			},
			/** @returns {ManagedPointer} */
			get: function () {
				var result = this.__buffer._unsafe_get (this.__index);
				return result;
			},
			set: function (value) {
				this.__buffer._unsafe_set (this.__index, value);
				return value;
			},
			/** @returns {ManagedPointer} */
			valueOf: function () {
				return this.get ();
			},
			clear: function () {
				this.set (0);
			},
			release: function () {
				const maxPooledInstances = 128;
				if (MONO._scratch_root_free_instances.length > maxPooledInstances) {
					MONO._mono_wasm_release_scratch_index (this.__index);
					this.__buffer = 0;
					this.__index = 0;
				} else {
					this.set (0);
					MONO._scratch_root_free_instances.push (this);
				}
			},
			toString: function () {
				return "[root @" + this.get_address () + "]";
			}
		},

		_mono_wasm_release_scratch_index: function (index) {
			if (index === undefined)
				return;

			this._scratch_root_buffer.set (index, 0);
			this._scratch_root_free_indices[this._scratch_root_free_indices_count] = index;
			this._scratch_root_free_indices_count++;
		},

		_mono_wasm_claim_scratch_index: function () {
			if (!this._scratch_root_buffer) {
				const maxScratchRoots = 8192;
				this._scratch_root_buffer = this.mono_wasm_new_root_buffer (maxScratchRoots, "js roots");

				this._scratch_root_free_indices = new Int32Array (maxScratchRoots);
				this._scratch_root_free_indices_count = maxScratchRoots;
				for (var i = 0; i < maxScratchRoots; i++)
					this._scratch_root_free_indices[i] = maxScratchRoots - i - 1;

				Object.defineProperty (this._mono_wasm_root_prototype, "value", {
					get: this._mono_wasm_root_prototype.get,
					set: this._mono_wasm_root_prototype.set,
					configurable: false
				});
			}

			if (this._scratch_root_free_indices_count < 1)
				throw new Error ("Out of scratch root space");

			var result = this._scratch_root_free_indices[this._scratch_root_free_indices_count - 1];
			this._scratch_root_free_indices_count--;
			return result;
		},

		_zero_region: function (byteOffset, sizeBytes) {
			if (((byteOffset % 4) === 0) && ((sizeBytes % 4) === 0))
				Module.HEAP32.fill(0, byteOffset / 4, sizeBytes / 4);
			else
				Module.HEAP8.fill(0, byteOffset, sizeBytes);
		},

		/**
		 * Allocates a block of memory that can safely contain pointers into the managed heap.
		 * The result object has get(index) and set(index, value) methods that can be used to retrieve and store managed pointers.
		 * Once you are done using the root buffer, you must call its release() method.
		 * For small numbers of roots, it is preferable to use the mono_wasm_new_root and mono_wasm_new_roots APIs instead.
		 * @param {number} capacity - the maximum number of elements the buffer can hold.
		 * @param {string} [msg] - a description of the root buffer (for debugging)
		 * @returns {WasmRootBuffer}
		 */
		mono_wasm_new_root_buffer: function (capacity, msg) {
			if (!this.mono_wasm_register_root || !this.mono_wasm_deregister_root) {
				this.mono_wasm_register_root = Module.cwrap ("mono_wasm_register_root", "number", ["number", "number", "string"]);
				this.mono_wasm_deregister_root = Module.cwrap ("mono_wasm_deregister_root", null, ["number"]);
			}

			if (capacity <= 0)
				throw new Error ("capacity >= 1");

			capacity = capacity | 0;

			var capacityBytes = capacity * 4;
			var offset = Module._malloc (capacityBytes);
			if ((offset % 4) !== 0)
				throw new Error ("Malloc returned an unaligned offset");

			this._zero_region (offset, capacityBytes);

			var result = Object.create (this._mono_wasm_root_buffer_prototype);
			result.__offset = offset;
			result.__offset32 = (offset / 4) | 0;
			result.__count = capacity;
			result.length = capacity;
			result.__handle = this.mono_wasm_register_root (offset, capacityBytes, msg || 0);
			result.__ownsAllocation = true;

			return result;
		},

		/**
		 * Creates a root buffer object representing an existing allocation in the native heap and registers
		 *  the allocation with the GC. The caller is responsible for managing the lifetime of the allocation.
		 * @param {NativePointer} offset - the offset of the root buffer in the native heap.
		 * @param {number} capacity - the maximum number of elements the buffer can hold.
		 * @param {string} [msg] - a description of the root buffer (for debugging)
		 * @returns {WasmRootBuffer}
		 */
		mono_wasm_new_root_buffer_from_pointer: function (offset, capacity, msg) {
			if (!this.mono_wasm_register_root || !this.mono_wasm_deregister_root) {
				this.mono_wasm_register_root = Module.cwrap ("mono_wasm_register_root", "number", ["number", "number", "string"]);
				this.mono_wasm_deregister_root = Module.cwrap ("mono_wasm_deregister_root", null, ["number"]);
			}

			if (capacity <= 0)
				throw new Error ("capacity >= 1");

			capacity = capacity | 0;

			var capacityBytes = capacity * 4;
			if ((offset % 4) !== 0)
				throw new Error ("Unaligned offset");

			this._zero_region (offset, capacityBytes);

			var result = Object.create (this._mono_wasm_root_buffer_prototype);
			result.__offset = offset;
			result.__offset32 = (offset / 4) | 0;
			result.__count = capacity;
			result.length = capacity;
			result.__handle = this.mono_wasm_register_root (offset, capacityBytes, msg || 0);
			result.__ownsAllocation = false;

			return result;
		},

		/**
		 * Allocates temporary storage for a pointer into the managed heap.
		 * Pointers stored here will be visible to the GC, ensuring that the object they point to aren't moved or collected.
		 * If you already have a managed pointer you can pass it as an argument to initialize the temporary storage.
		 * The result object has get() and set(value) methods, along with a .value property.
		 * When you are done using the root you must call its .release() method.
		 * @param {ManagedPointer} [value] - an address in the managed heap to initialize the root with (or 0)
		 * @returns {WasmRoot}
		 */
		mono_wasm_new_root: function (value) {
			var result;

			if (this._scratch_root_free_instances.length > 0) {
				result = this._scratch_root_free_instances.pop ();
			} else {
				var index = this._mono_wasm_claim_scratch_index ();
				var buffer = this._scratch_root_buffer;

				result = Object.create (this._mono_wasm_root_prototype);
				result.__buffer = buffer;
				result.__index = index;
			}

			if (value !== undefined) {
				if (typeof (value) !== "number")
					throw new Error ("value must be an address in the managed heap");

				result.set (value);
			} else {
				result.set (0);
			}

			return result;
		},

		/**
		 * Allocates 1 or more temporary roots, accepting either a number of roots or an array of pointers.
		 * mono_wasm_new_roots(n): returns an array of N zero-initialized roots.
		 * mono_wasm_new_roots([a, b, ...]) returns an array of new roots initialized with each element.
		 * Each root must be released with its release method, or using the mono_wasm_release_roots API.
		 * @param {(number | ManagedPointer[])} count_or_values - either a number of roots or an array of pointers
		 * @returns {WasmRoot[]}
		 */
		mono_wasm_new_roots: function (count_or_values) {
			var result;

			if (Array.isArray (count_or_values)) {
				result = new Array (count_or_values.length);
				for (var i = 0; i < result.length; i++)
					result[i] = this.mono_wasm_new_root (count_or_values[i]);
			} else if ((count_or_values | 0) > 0) {
				result = new Array (count_or_values);
				for (var i = 0; i < result.length; i++)
					result[i] = this.mono_wasm_new_root ();
			} else {
				throw new Error ("count_or_values must be either an array or a number greater than 0");
			}

			return result;
		},

		/**
		 * Releases 1 or more root or root buffer objects.
		 * Multiple objects may be passed on the argument list.
		 * 'undefined' may be passed as an argument so it is safe to call this method from finally blocks
		 *  even if you are not sure all of your roots have been created yet.
		 * @param {... WasmRoot} roots
		 */
		mono_wasm_release_roots: function () {
			for (var i = 0; i < arguments.length; i++) {
				if (!arguments[i])
					continue;

				arguments[i].release ();
			}
		},

		mono_text_decoder: undefined,
		string_decoder: {
			copy: function (mono_string) {
				if (mono_string == 0)
					return null;

				if (!this.mono_wasm_string_convert)
					this.mono_wasm_string_convert = Module.cwrap ("mono_wasm_string_convert", null, ['number']);

				this.mono_wasm_string_convert (mono_string);
				var result = this.result;
				this.result = undefined;
				return result;
			},
			decode: function (start, end, save) {
				if (!MONO.mono_text_decoder) {
					MONO.mono_text_decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;
				}

				var str = "";
				if (MONO.mono_text_decoder) {
					// When threading is enabled, TextDecoder does not accept a view of a
					// SharedArrayBuffer, we must make a copy of the array first.
					var subArray = typeof SharedArrayBuffer !== 'undefined' && Module.HEAPU8.buffer instanceof SharedArrayBuffer
						? Module.HEAPU8.slice(start, end)
						: Module.HEAPU8.subarray(start, end);

					str = MONO.mono_text_decoder.decode(subArray);
				} else {
					for (var i = 0; i < end - start; i+=2) {
						var char = Module.getValue (start + i, 'i16');
						str += String.fromCharCode (char);
					}
				}
				if (save)
					this.result = str;

				return str;
			},
		},

		mono_wasm_get_exception_object: function() {
			var exception_obj = MONO.active_exception;
			MONO.active_exception = null;
			return exception_obj ;
		},

		mono_wasm_get_call_stack: function() {
			if (!this.mono_wasm_current_bp_id)
				this.mono_wasm_current_bp_id = Module.cwrap ("mono_wasm_current_bp_id", 'number');
			if (!this.mono_wasm_enum_frames)
				this.mono_wasm_enum_frames = Module.cwrap ("mono_wasm_enum_frames", null);

			var bp_id = this.mono_wasm_current_bp_id ();
			this.active_frames = [];
			this.mono_wasm_enum_frames ();

			var the_frames = this.active_frames;
			this.active_frames = [];
			return {
				"breakpoint_id": bp_id,
				"frames": the_frames,
			};
		},

		_fixup_name_value_objects: function (var_list) {
			let out_list = [];

			var i = 0;
			while (i < var_list.length) {
				let o = var_list [i];
				const this_has_name = o.name !== undefined;
				let next_has_value_or_get_set = false;

				if (i + 1 < var_list.length) {
					const next = var_list [i+1];
					next_has_value_or_get_set = next.value !== undefined || next.get !== undefined || next.set !== undefined;
				}

				if (!this_has_name) {
					// insert the object as-is
					// Eg. in case of locals, the names are added
					// later
					i ++;
				} else if (next_has_value_or_get_set) {
					// found a {name} followed by a {value/get}
					o = Object.assign (o, var_list [i + 1]);
					i += 2;
				} else {
					// missing value/get, so add a placeholder one
					o.value = {
						type: "symbol",
						value: "<unreadable value>",
						description: "<unreadable value>"
					};
					i ++;
				}

				out_list.push (o);
			}

			return out_list;
		},

		_filter_automatic_properties: function (props, accessors_only=false) {
			// Note: members in @props, have derived class members, followed by
			//       those from parent classes

			// Note: Auto-properties have backing fields, named with a special suffix.
			//       @props here will have the backing field, *and* the getter.
			//
			//       But we want to return only one name/value pair:
			//          [name of the auto-property] = value of the backing field

			let getters = {};
			let all_fields_except_backing_fields = {};
			let backing_fields = {};

			// Split props into the 3 groups - backing_fields, getters, and all_fields_except_backing_fields
			props.forEach(p => {
				if (p.name === undefined) {
					console.debug(`Bug: Found a member with no name. Skipping it. p: ${JSON.stringify(p)}`);
					return;
				}

				if (p.name.endsWith('k__BackingField')) {
					const auto_prop_name = p.name.replace ('k__BackingField', '')
						.replace ('<', '')
						.replace ('>', '');

					// Only take the first one, as that is overriding others
					if (!(auto_prop_name in backing_fields))
						backing_fields[auto_prop_name] = Object.assign(p, { name: auto_prop_name });

				} else if (p.get !== undefined) {
					// if p wasn't overridden by a getter or a field,
					// from a more derived class
					if (!(p.name in getters) && !(p.name in all_fields_except_backing_fields))
						getters[p.name] = p;

				} else if (!(p.name in all_fields_except_backing_fields)) {
					all_fields_except_backing_fields[p.name] = p;
				}
			});

			// Filter/merge backing fields, and getters
			Object.values(backing_fields).forEach(backing_field => {
				const auto_prop_name = backing_field.name;
				const getter = getters[auto_prop_name];

				if (getter === undefined) {
					// backing field with no getter
					// eg. when a field overrides/`new string foo=..`
					//     an autoproperty
					return;
				}

				if (auto_prop_name in all_fields_except_backing_fields) {
					delete getters[auto_prop_name];
				} else if (getter.__args.owner_class === backing_field.__args.owner_class) {
					// getter+backing_field are from the same class.
					// Add the backing_field value as a field
					all_fields_except_backing_fields[auto_prop_name] = backing_field;

					// .. and drop the auto-prop getter
					delete getters[auto_prop_name];
				}
			});

			if (accessors_only)
				return Object.values(getters);

			return Object.values(all_fields_except_backing_fields).concat(Object.values(getters));
		},

		/** Given `dotnet:object:foo:bar`,
		 * returns { scheme:'object', value: 'foo:bar' }
		 *
		 * Given `dotnet:pointer:{ b: 3 }`
		 * returns { scheme:'object', value: '{b:3}`, o: {b:3}
		 *
		 * @param  {string} idStr
		 * @param  {boolean} [throwOnError=false]
		 *
		 * @returns {WasmId}
		 */
		_parse_object_id: function (idStr, throwOnError = false) {
			if (idStr === undefined || idStr == "" || !idStr.startsWith ('dotnet:')) {
				if (throwOnError)
					throw new Error (`Invalid id: ${idStr}`);

				return undefined;
			}

			const [, scheme, ...rest] = idStr.split(':');
			let res = {
				scheme,
				value: rest.join (':'),
				idStr,
				o: {}
			};

			try {
				res.o = JSON.parse(res.value);
			// eslint-disable-next-line no-empty
			} catch (e) {}

			return res;
		},

        _resolve_member_by_name: function (base_object, base_name, expr_parts) {
            if (base_object === undefined || base_object.value === undefined)
                throw new Error(`Bug: base_object is undefined`);

            if (base_object.value.type === 'object' && base_object.value.subtype === 'null')
                throw new ReferenceError(`Null reference: ${base_name} is null`);

            if (base_object.value.type !== 'object')
                throw new ReferenceError(`'.' is only supported on non-primitive types. Failed on '${base_name}'`);

            if (expr_parts.length == 0)
                throw new Error(`Invalid member access expression`);//FIXME: need the full expression here

            const root = expr_parts[0];
            const props = this.mono_wasm_get_details(base_object.value.objectId, {});
            let resObject = props.find(l => l.name == root);
            if (resObject !== undefined) {
                if (resObject.value === undefined && resObject.get !== undefined)
                    resObject = this._invoke_getter(base_object.value.objectId, root);
            }

            if (resObject === undefined || expr_parts.length == 1)
                return resObject;
            else {
                expr_parts.shift();
                return this._resolve_member_by_name(resObject, root, expr_parts);
            }
        },

        mono_wasm_eval_member_access: function (scope, var_list, rootObjectId, expr) {
            if (expr === undefined || expr.length == 0)
                throw new Error(`expression argument required`);

            let parts = expr.split('.');
            if (parts.length == 0)
                throw new Error(`Invalid member access expression: ${expr}`);

            const root = parts[0];

            const locals = this.mono_wasm_get_variables(scope, var_list);
            let rootObject = locals.find(l => l.name === root);
            if (rootObject === undefined) {
                // check `this`
                const thisObject = locals.find(l => l.name == "this");
                if (thisObject === undefined)
                    throw new ReferenceError(`Could not find ${root} in locals, and no 'this' found.`);

                const thisProps = this.mono_wasm_get_details(thisObject.value.objectId, {});
                rootObject = thisProps.find(tp => tp.name == root);
                if (rootObject === undefined)
                    throw new ReferenceError(`Could not find ${root} in locals, or in 'this'`);

                if (rootObject.value === undefined && rootObject.get !== undefined)
                    rootObject = this._invoke_getter(thisObject.value.objectId, root);
            }

            parts.shift();

            if (parts.length == 0)
                return rootObject;

            if (rootObject === undefined || rootObject.value === undefined)
                throw new Error(`Could not get a value for ${root}`);

            return this._resolve_member_by_name(rootObject, root, parts);
        },

		/**
		 * @param  {WasmId} id
		 * @returns {object[]}
		 */
		_get_vt_properties: function (id, args={}) {
			let entry = this._get_id_props (id.idStr);

			if (entry === undefined || entry.members === undefined) {
				if (!isNaN (id.o.containerId)) {
					// We are expanding, so get *all* the members.
					// Which ones to return based on @args, can be determined
					// at the time of return
					this._get_object_properties (id.o.containerId, { expandValueTypes: true });
				} else if (!isNaN (id.o.arrayId))
					this._get_array_values (id, Number (id.o.arrayIdx), 1, true);
				else
					throw new Error (`Invalid valuetype id (${id.idStr}). Can't get properties for it.`);
			}

			// Let's try again
			entry = this._get_id_props (id.idStr);

			if (entry !== undefined && entry.members !== undefined) {
				if (args.accessorPropertiesOnly === true)
					return entry.accessors;

				return entry.members;
			}

			throw new Error (`Unknown valuetype id: ${id.idStr}. Failed to get properties for it.`);
		},

		/**
		 *
		 * @callback GetIdArgsCallback
		 * @param {object} var
		 * @param {number} idx
		 * @returns {object}
		 */

		/**
		 * @param  {object[]} vars
		 * @param  {GetIdArgsCallback} getIdArgs
		 * @returns {object}
		 */
		_assign_vt_ids: function (vars, getIdArgs)
		{
			vars.forEach ((v, i) => {
				// we might not have a `.value`, like in case of getters which have a `.get` instead
				const value = v.value;
				if (value === undefined || !value.isValueType)
					return;

				if (value.objectId !== undefined)
					throw new Error (`Bug: Trying to assign valuetype id, but the var already has one: ${v}`);

				value.objectId = this._new_or_add_id_props ({ scheme: 'valuetype', idArgs: getIdArgs (v, i), props: value._props });
				delete value._props;
			});

			return vars;
		},

		//
		// @var_list: [ { index: <var_id>, name: <var_name> }, .. ]
		mono_wasm_get_variables: function(scope, var_list) {
			const numBytes = var_list.length * Int32Array.BYTES_PER_ELEMENT;
			const ptr = Module._malloc(numBytes);
			let heapBytes = new Int32Array(Module.HEAP32.buffer, ptr, numBytes);
			for (let i=0; i<var_list.length; i++) {
				heapBytes[i] = var_list[i].index;
			}

			this._async_method_objectId = 0;
			let { res_ok, res } = this.mono_wasm_get_local_vars_info (scope, heapBytes.byteOffset, var_list.length);
			Module._free(heapBytes.byteOffset);
			if (!res_ok)
				throw new Error (`Failed to get locals for scope ${scope}`);

			if (this._async_method_objectId != 0)
				this._assign_vt_ids (res, v => ({ containerId: this._async_method_objectId, fieldOffset: v.fieldOffset }));

			for (let i in res) {
				const res_name = res [i].name;
				if (this._async_method_objectId != 0) {
					//Async methods are special in the way that local variables can be lifted to generated class fields
					//value of "this" comes here either
					if (res_name !== undefined && res_name.indexOf ('>') > 0) {
						// For async methods, we get the names too, so use that
						// ALTHOUGH, the name wouldn't have `<>` for method args
						res [i].name = res_name.substring (1, res_name.indexOf ('>'));
					}
				} else if (res_name === undefined && var_list [i] !== undefined) {
					// For non-async methods, we just have the var id, but we have the name
					// from the caller
					res [i].name = var_list [i].name;
				}
			}

			this._post_process_details(res);
			return res;
		},

		// Keep in sync with the flags in mini-wasm-debugger.c
		_get_properties_args_to_gpflags: function (args) {
			let gpflags =0;
			/*
				Disabled for now. Instead, we ask debugger.c to return
				~all~ the members, and then handle the filtering in mono.js .

			if (args.ownProperties)
				gpflags |= 1;
			if (args.accessorPropertiesOnly)
				gpflags |= 2;
			*/
			if (args.expandValueTypes)
				gpflags |= 4;

			return gpflags;
		},

		/**
		 * @param  {number} idNum
		 * @param  {boolean} expandValueTypes
		 * @returns {object}
		 */
		_get_object_properties: function(idNum, args={}) {
			let gpflags = this._get_properties_args_to_gpflags (args);

			let { res_ok, res } = this.mono_wasm_get_object_properties_info (idNum, gpflags);
			if (!res_ok)
				throw new Error (`Failed to get properties for ${idNum}`);

			res = MONO._filter_automatic_properties (res, args.accessorPropertiesOnly === true);
			res = this._assign_vt_ids (res, v => ({ containerId: idNum, fieldOffset: v.fieldOffset }));
			res = this._post_process_details (res);

			return res;
		},

		/**
		 * @param  {WasmId} id
		 * @param  {number} [startIdx=0]
		 * @param  {number} [count=-1]
		 * @param  {boolean} [expandValueTypes=false]
		 * @returns {object[]}
		 */
		_get_array_values: function (id, startIdx = 0, count = -1, expandValueTypes = false) {
			if (isNaN (id.o.arrayId) || isNaN (startIdx))
				throw new Error (`Invalid array id: ${id.idStr}`);

			let gpflags = this._get_properties_args_to_gpflags({ expandValueTypes });
			let { res_ok, res } = this.mono_wasm_get_array_values_info (id.o.arrayId, startIdx, count, gpflags);
			if (!res_ok)
				throw new Error (`Failed to get properties for array id ${id.idStr}`);

			res = this._assign_vt_ids (res, (_, i) => ({ arrayId: id.o.arrayId, arrayIdx: Number (startIdx) + i}));

			for (let i = 0; i < res.length; i ++) {
				let value = res [i].value;
				if (value.objectId !== undefined && value.objectId.startsWith("dotnet:pointer"))
					this._new_or_add_id_props ({ objectId: value.objectId, props: { varName: `[${i}]` } });
			}
			res = this._post_process_details (res);
			return res;
		},

		_post_process_details: function (details) {
			if (details == undefined)
				return {};

			if (details.length > 0)
				this._extract_and_cache_value_types(details);

			// remove __args added by add_properties_var
			details.forEach(d => delete d.__args);
			return details;
		},

		/**
		 * Gets the next id number to use for generating ids
		 *
		 * @returns {number}
		 */
		_next_id: function () {
			return ++this._next_id_var;
		},

		_extract_and_cache_value_types: function (var_list) {
			if (var_list == undefined || !Array.isArray (var_list) || var_list.length == 0)
				return var_list;

			for (let i in var_list) {
				let value = var_list [i].value;
				if (value === undefined)
					continue;

				if (value.objectId !== undefined && value.objectId.startsWith ("dotnet:pointer:")) {
					let ptr_args = this._get_id_props (value.objectId);
					if (ptr_args === undefined)
						throw new Error (`Bug: Expected to find an entry for pointer id: ${value.objectId}`);

					// It might have been already set in some cases, like arrays
					// where the name would be `0`, but we want `[0]` for pointers,
					// so the deref would look like `*[0]`
					ptr_args.varName = ptr_args.varName || var_list [i].name;
				}

				if (value.type != "object" || value.isValueType != true || value.expanded != true) // undefined would also give us false
					continue;

				if (value.members === undefined) {
					// this could happen for valuetypes that maybe
					// we were not able to describe, like `ref` parameters
					// So, skip that
					continue;
				}

				// Generate objectId for expanded valuetypes
				value.objectId = value.objectId || this._new_or_add_id_props ({ scheme: 'valuetype' });

				this._extract_and_cache_value_types (value.members);

				const accessors = value.members.filter(m => m.get !== undefined);
				const new_props = Object.assign ({ members: value.members, accessors }, value.__extra_vt_props);

				this._new_or_add_id_props ({ objectId: value.objectId, props: new_props });
				delete value.members;
				delete value.__extra_vt_props;
			}

			return var_list;
		},

		_get_cfo_res_details: function (objectId, args) {
			if (!(objectId in this._call_function_res_cache))
				throw new Error(`Could not find any object with id ${objectId}`);

			const real_obj = this._call_function_res_cache [objectId];

			const descriptors = Object.getOwnPropertyDescriptors (real_obj);
			if (args.accessorPropertiesOnly) {
				Object.keys (descriptors).forEach (k => {
					if (descriptors [k].get === undefined)
						Reflect.deleteProperty (descriptors, k);
				});
			}

			let res_details = [];
			Object.keys (descriptors).forEach (k => {
				let new_obj;
				let prop_desc = descriptors [k];
				if (typeof prop_desc.value == "object") {
					// convert `{value: { type='object', ... }}`
					// to      `{ name: 'foo', value: { type='object', ... }}
					new_obj = Object.assign ({ name: k }, prop_desc);
				} else if (prop_desc.value !== undefined) {
					// This is needed for values that were not added by us,
					// thus are like { value: 5 }
					// instead of    { value: { type = 'number', value: 5 }}
					//
					// This can happen, for eg., when `length` gets added for arrays
					// or `__proto__`.
					new_obj = {
						name: k,
						// merge/add `type` and `description` to `d.value`
						value: Object.assign ({ type: (typeof prop_desc.value), description: '' + prop_desc.value },
												prop_desc)
					};
				} else if (prop_desc.get !== undefined) {
					// The real_obj has the actual getter. We are just returning a placeholder
					// If the caller tries to run function on the cfo_res object,
					// that accesses this property, then it would be run on `real_obj`,
					// which *has* the original getter
					new_obj = {
						name: k,
						get: {
							className: "Function",
							description: `get ${k} () {}`,
							type: "function"
						}
					};
				} else {
					new_obj = { name: k, value: { type: "symbol", value: "<Unknown>", description: "<Unknown>"} };
				}

				res_details.push (new_obj);
			});

			return { __value_as_json_string__: JSON.stringify (res_details) };
		},

		/**
		 * Generates a new id, and a corresponding entry for associated properties
		 *    like `dotnet:pointer:{ a: 4 }`
		 * The third segment of that `{a:4}` is the idArgs parameter
		 *
		 * Only `scheme` or `objectId` can be set.
		 * if `scheme`, then a new id is generated, and it's properties set
		 * if `objectId`, then it's properties are updated
		 *
		 * @param {object} args
		 * @param  {string} [args.scheme=undefined] scheme second part of `dotnet:pointer:..`
		 * @param  {string} [args.objectId=undefined] objectId
		 * @param  {object} [args.idArgs={}] The third segment of the objectId
		 * @param  {object} [args.props={}] Properties for the generated id
		 *
		 * @returns {string} generated/updated id string
		 */
		_new_or_add_id_props: function ({ scheme = undefined, objectId = undefined, idArgs = {}, props = {} }) {
			if (scheme === undefined && objectId === undefined)
				throw new Error (`Either scheme or objectId must be given`);

			if (scheme !== undefined && objectId !== undefined)
				throw new Error (`Both scheme, and objectId cannot be given`);

			if (objectId !== undefined && Object.entries (idArgs).length > 0)
				throw new Error (`Both objectId, and idArgs cannot be given`);

			if (Object.entries (idArgs).length == 0) {
				// We want to generate a new id, only if it doesn't have other
				// attributes that it can use to uniquely identify.
				// Eg, we don't do this for `dotnet:valuetype:{containerId:4, fieldOffset: 24}`
				idArgs.num = this._next_id ();
			}

			let idStr;
			if (objectId !== undefined) {
				idStr = objectId;
				const old_props = this._id_table [idStr];
				if (old_props === undefined)
					throw new Error (`ObjectId not found in the id table: ${idStr}`);

				this._id_table [idStr] = Object.assign (old_props, props);
			} else {
				idStr = `dotnet:${scheme}:${JSON.stringify (idArgs)}`;
				this._id_table [idStr] = props;
			}

			return idStr;
		},

		/**
		 * @param  {string} objectId
		 * @returns {object}
		 */
		_get_id_props: function (objectId) {
			return this._id_table [objectId];
		},

		_get_deref_ptr_value: function (objectId) {
			const ptr_args = this._get_id_props (objectId);
			if (ptr_args === undefined)
				throw new Error (`Unknown pointer id: ${objectId}`);

			if (ptr_args.ptr_addr == 0 || ptr_args.klass_addr == 0)
				throw new Error (`Both ptr_addr and klass_addr need to be non-zero, to dereference a pointer. objectId: ${objectId}`);

			const value_addr = new DataView (Module.HEAPU8.buffer).getUint32 (ptr_args.ptr_addr, /* littleEndian */ true);
			let { res_ok, res } = this.mono_wasm_get_deref_ptr_value_info (value_addr, ptr_args.klass_addr);
			if (!res_ok)
				throw new Error (`Failed to dereference pointer ${objectId}`);

			if (res.length > 0) {
				if (ptr_args.varName === undefined)
					throw new Error (`Bug: no varName found for the pointer. objectId: ${objectId}`);

				res [0].name = `*${ptr_args.varName}`;
			}

			res = this._post_process_details (res);
			return res;
		},

		mono_wasm_get_details: function (objectId, args={}) {
			let id = this._parse_object_id (objectId, true);

			switch (id.scheme) {
				case "object": {
					if (isNaN (id.value))
						throw new Error (`Invalid objectId: ${objectId}. Expected a numeric id.`);

					args.expandValueTypes = false;
					return this._get_object_properties(id.value, args);
				}

				case "array":
					return this._get_array_values (id);

				case "valuetype":
					return this._get_vt_properties(id, args);

				case "cfo_res":
					return this._get_cfo_res_details (objectId, args);

				case "pointer": {
					return this._get_deref_ptr_value (objectId);
				}

				default:
					throw new Error(`Unknown object id format: ${objectId}`);
			}
		},

		_cache_call_function_res: function (obj) {
			const id = `dotnet:cfo_res:${this._next_call_function_res_id++}`;
			this._call_function_res_cache[id] = obj;
			return id;
		},

		mono_wasm_release_object: function (objectId) {
			if (objectId in this._cache_call_function_res)
				delete this._cache_call_function_res[objectId];
		},

		/**
		 * @param  {string} objectIdStr objectId
		 * @param  {string} name property name
		 * @returns {object} return value
		 */
		_invoke_getter: function (objectIdStr, name) {
			const id = this._parse_object_id (objectIdStr);
			if (id === undefined)
				throw new Error (`Invalid object id: ${objectIdStr}`);

			let getter_res;
			if (id.scheme == 'object') {
				if (isNaN (id.o) || id.o < 0)
					throw new Error (`Invalid object id: ${objectIdStr}`);

				let { res_ok, res } = this.mono_wasm_invoke_getter_on_object_info (id.o, name);
				if (!res_ok)
					throw new Error (`Invoking getter on ${objectIdStr} failed`);

				getter_res = res;
			} else if (id.scheme == 'valuetype') {
				const id_props = this._get_id_props (objectIdStr);
				if (id_props === undefined)
					throw new Error (`Unknown valuetype id: ${objectIdStr}`);

				if (typeof id_props.value64 !== 'string' || isNaN (id_props.klass))
					throw new Error (`Bug: Cannot invoke getter on ${objectIdStr}, because of missing or invalid klass/value64 fields. idProps: ${JSON.stringify (id_props)}`);

				const dataPtr = Module._malloc (id_props.value64.length);
				const dataHeap = new Uint8Array (Module.HEAPU8.buffer, dataPtr, id_props.value64.length);
				dataHeap.set (new Uint8Array (this._base64_to_uint8 (id_props.value64)));

				let { res_ok, res } = this.mono_wasm_invoke_getter_on_value_info (dataHeap.byteOffset, id_props.klass, name);
				Module._free (dataHeap.byteOffset);

				if (!res_ok) {
					console.debug (`Invoking getter on valuetype ${objectIdStr}, with props: ${JSON.stringify (id_props)} failed`);
					throw new Error (`Invoking getter on valuetype ${objectIdStr} failed`);
				}
				getter_res = res;
			} else {
				throw new Error (`Only object, and valuetypes supported for getters, id: ${objectIdStr}`);
			}

			getter_res = MONO._post_process_details (getter_res);
			return getter_res.length > 0 ? getter_res [0] : {};
		},

		_create_proxy_from_object_id: function (objectId) {
			const details = this.mono_wasm_get_details(objectId);

			if (objectId.startsWith ('dotnet:array:'))
				return details.map (p => p.value);

			let proxy = {};
			Object.keys (details).forEach (p => {
				var prop = details [p];
				if (prop.get !== undefined) {
					// TODO: `set`

					Object.defineProperty (proxy,
							prop.name,
							{ get () { return MONO._invoke_getter (objectId, prop.name); } }
					);
				} else {
					proxy [prop.name] = prop.value;
				}
			});

			return proxy;
		},

		mono_wasm_call_function_on: function (request) {
			if (request.arguments != undefined && !Array.isArray (request.arguments))
				throw new Error (`"arguments" should be an array, but was ${request.arguments}`);

			const objId = request.objectId;
			let proxy;

			if (objId.startsWith ('dotnet:cfo_res:')) {
				if (objId in this._call_function_res_cache)
					proxy = this._call_function_res_cache [objId];
				else
					throw new Error (`Unknown object id ${objId}`);
			} else {
				proxy = this._create_proxy_from_object_id (objId);
			}

			const fn_args = request.arguments != undefined ? request.arguments.map(a => JSON.stringify(a.value)) : [];
			const fn_eval_str = `var fn = ${request.functionDeclaration}; fn.call (proxy, ...[${fn_args}]);`;

			const fn_res = eval (fn_eval_str);
			if (fn_res === undefined)
				return { type: "undefined" };

			if (fn_res === null || (fn_res.subtype === 'null' && fn_res.value === undefined))
				return fn_res;

			// primitive type
			if (Object (fn_res) !== fn_res)
				return fn_res;

			// return .value, if it is a primitive type
			if (fn_res.value !== undefined && Object (fn_res.value.value) !== fn_res.value.value)
				return fn_res.value;

			if (request.returnByValue)
				return {type: "object", value: fn_res};

			const fn_res_id = this._cache_call_function_res (fn_res);
			if (Object.getPrototypeOf (fn_res) == Array.prototype) {
				return {
					type: "object",
					subtype: "array",
					className: "Array",
					description: `Array(${fn_res.length})`,
					objectId: fn_res_id
				};
			} else {
				return { type: "object", className: "Object", description: "Object", objectId: fn_res_id };
			}
		},

		_clear_per_step_state: function () {
			this._next_id_var = 0;
			this._id_table = {};
		},

		mono_wasm_debugger_resume: function () {
			this._clear_per_step_state ();
		},

		mono_wasm_start_single_stepping: function (kind) {
			console.debug (">> mono_wasm_start_single_stepping " + kind);
			if (!this.mono_wasm_setup_single_step)
				this.mono_wasm_setup_single_step = Module.cwrap ("mono_wasm_setup_single_step", 'number', [ 'number']);

			this._clear_per_step_state ();

			return this.mono_wasm_setup_single_step (kind);
		},

		mono_wasm_set_pause_on_exceptions: function (state) {
			if (!this.mono_wasm_pause_on_exceptions)
				this.mono_wasm_pause_on_exceptions = Module.cwrap ("mono_wasm_pause_on_exceptions", 'number', [ 'number']);
			var state_enum = 0;
			switch (state) {
				case 'uncaught':
					state_enum = 1; //EXCEPTION_MODE_UNCAUGHT
					break;
				case 'all':
					state_enum = 2; //EXCEPTION_MODE_ALL
					break;
			}
			return this.mono_wasm_pause_on_exceptions (state_enum);
		},

		mono_wasm_detach_debugger: function () {
			if (!this.mono_wasm_set_is_debugger_attached)
				this.mono_wasm_set_is_debugger_attached = Module.cwrap ('mono_wasm_set_is_debugger_attached', 'void', ['bool']);
			this.mono_wasm_set_is_debugger_attached(false);
		},

		_register_c_fn: function (name, ...args) {
			Object.defineProperty (this._c_fn_table, name + '_wrapper', { value: Module.cwrap (name, ...args) });
		},

		/**
		 * Calls `Module.cwrap` for the function name,
		 * and creates a wrapper around it that returns
		 *     `{ bool result, object var_info }
		 *
		 * @param  {string} name C function name
		 * @param  {string} ret_type
		 * @param  {string[]} params
		 *
		 * @returns {void}
		 */
		_register_c_var_fn: function (name, ret_type, params) {
			if (ret_type !== 'bool')
				throw new Error (`Bug: Expected a C function signature that returns bool`);

			this._register_c_fn (name, ret_type, params);
			Object.defineProperty (this, name + '_info', {
				value: function (...args) {
					MONO.var_info = [];
					const res_ok = MONO._c_fn_table [name + '_wrapper'] (...args);
					let res = MONO.var_info;
					MONO.var_info = [];
					if (res_ok) {
						res = this._fixup_name_value_objects (res);
						return { res_ok, res };
					}

					return { res_ok, res: undefined };
				}
			});
		},

		mono_wasm_runtime_ready: function () {
			this.mono_wasm_runtime_is_ready = true;
			this._clear_per_step_state ();

			// FIXME: where should this go?
			this._next_call_function_res_id = 0;
			this._call_function_res_cache = {};

			this._c_fn_table = {};
			this._register_c_var_fn ('mono_wasm_get_object_properties',   'bool', [ 'number', 'number' ]);
			this._register_c_var_fn ('mono_wasm_get_array_values',        'bool', [ 'number', 'number', 'number', 'number' ]);
			this._register_c_var_fn ('mono_wasm_invoke_getter_on_object', 'bool', [ 'number', 'string' ]);
			this._register_c_var_fn ('mono_wasm_invoke_getter_on_value',  'bool', [ 'number', 'number', 'string' ]);
			this._register_c_var_fn ('mono_wasm_get_local_vars',          'bool', [ 'number', 'number', 'number']);
			this._register_c_var_fn ('mono_wasm_get_deref_ptr_value',     'bool', [ 'number', 'number']);
			// DO NOT REMOVE - magic debugger init function
			if (globalThis.dotnetDebugger)
				debugger;
			else
				console.debug ("mono_wasm_runtime_ready", "fe00e07a-5519-4dfe-b35a-f867dbaf2e28");
		},

		mono_wasm_set_breakpoint: function (assembly, method_token, il_offset) {
			if (!this.mono_wasm_set_bp)
				this.mono_wasm_set_bp = Module.cwrap ('mono_wasm_set_breakpoint', 'number', ['string', 'number', 'number']);

			return this.mono_wasm_set_bp (assembly, method_token, il_offset)
		},

		mono_wasm_remove_breakpoint: function (breakpoint_id) {
			if (!this.mono_wasm_del_bp)
				this.mono_wasm_del_bp = Module.cwrap ('mono_wasm_remove_breakpoint', 'number', ['number']);

			return this.mono_wasm_del_bp (breakpoint_id);
		},

		// Set environment variable NAME to VALUE
		// Should be called before mono_load_runtime_and_bcl () in most cases
		mono_wasm_setenv: function (name, value) {
			if (!this.wasm_setenv)
				this.wasm_setenv = Module.cwrap ('mono_wasm_setenv', null, ['string', 'string']);
			this.wasm_setenv (name, value);
		},

		mono_wasm_set_runtime_options: function (options) {
			if (!this.wasm_parse_runtime_options)
				this.wasm_parse_runtime_options = Module.cwrap ('mono_wasm_parse_runtime_options', null, ['number', 'number']);
			var argv = Module._malloc (options.length * 4);
			var wasm_strdup = Module.cwrap ('mono_wasm_strdup', 'number', ['string']);
			let aindex = 0;
			for (var i = 0; i < options.length; ++i) {
				Module.setValue (argv + (aindex * 4), wasm_strdup (options [i]), "i32");
				aindex += 1;
			}
			this.wasm_parse_runtime_options (options.length, argv);
		},

		//
		// Initialize the AOT profiler with OPTIONS.
		// Requires the AOT profiler to be linked into the app.
		// options = { write_at: "<METHODNAME>", send_to: "<METHODNAME>" }
		// <METHODNAME> should be in the format <CLASS>::<METHODNAME>.
		// write_at defaults to 'WebAssembly.Runtime::StopProfile'.
		// send_to defaults to 'WebAssembly.Runtime::DumpAotProfileData'.
		// DumpAotProfileData stores the data into Module.aot_profile_data.
		//
		mono_wasm_init_aot_profiler: function (options) {
			if (options == null)
				options = {}
			if (!('write_at' in options))
				options.write_at = 'Interop/Runtime::StopProfile';
			if (!('send_to' in options))
				options.send_to = 'Interop/Runtime::DumpAotProfileData';
			var arg = "aot:write-at-method=" + options.write_at + ",send-to-method=" + options.send_to;
			Module.ccall ('mono_wasm_load_profiler_aot', null, ['string'], [arg]);
		},

		// options = { write_at: "<METHODNAME>", send_to: "<METHODNAME>" }
		// <METHODNAME> should be in the format <CLASS>::<METHODNAME>.
		// write_at defaults to 'WebAssembly.Runtime::StopProfile'.
		// send_to defaults to 'WebAssembly.Runtime::DumpCoverageProfileData'.
		// DumpCoverageProfileData stores the data into Module.coverage_profile_data.
		mono_wasm_init_coverage_profiler: function (options) {
			if (options == null)
				options = {}
			if (!('write_at' in options))
				options.write_at = 'WebAssembly.Runtime::StopProfile';
			if (!('send_to' in options))
				options.send_to = 'WebAssembly.Runtime::DumpCoverageProfileData';
			var arg = "coverage:write-at-method=" + options.write_at + ",send-to-method=" + options.send_to;
			Module.ccall ('mono_wasm_load_profiler_coverage', null, ['string'], [arg]);
		},

		_apply_configuration_from_args: function (args) {
			for (var k in (args.environment_variables || {}))
				MONO.mono_wasm_setenv (k, args.environment_variables[k]);

			if (args.runtime_options)
				MONO.mono_wasm_set_runtime_options (args.runtime_options);

			if (args.aot_profiler_options)
				MONO.mono_wasm_init_aot_profiler (args.aot_profiler_options);

			if (args.coverage_profiler_options)
				MONO.mono_wasm_init_coverage_profiler (args.coverage_profiler_options);
		},

		_get_fetch_file_cb_from_args: function (args) {
			if (typeof (args.fetch_file_cb) === "function")
				return args.fetch_file_cb;

			if (ENVIRONMENT_IS_NODE) {
				var fs = require('fs');
				return function (asset) {
					console.debug ("MONO_WASM: Loading... " + asset);
					var binary = fs.readFileSync (asset);
					var resolve_func2 = function (resolve, reject) {
						resolve (new Uint8Array (binary));
					};

					var resolve_func1 = function (resolve, reject) {
						var response = {
							ok: true,
							url: asset,
							arrayBuffer: function () {
								return new Promise (resolve_func2);
							}
						};
						resolve (response);
					};

					return new Promise (resolve_func1);
				};
			} else if (typeof (fetch) === "function") {
				return function (asset) {
					return fetch (asset, { credentials: 'same-origin' });
				};
			} else {
				throw new Error ("No fetch_file_cb was provided and this environment does not expose 'fetch'.");
			}
		},

		_handle_loaded_asset: function (ctx, asset, url, blob) {
			var bytes = new Uint8Array (blob);
			if (ctx.tracing)
				console.log ("MONO_WASM: Loaded:", asset.name, "size", bytes.length, "from", url);

			var virtualName = asset.virtual_path || asset.name;
			var offset = null;

			switch (asset.behavior) {
				case "resource":
				case "assembly":
					ctx.loaded_files.push ({ url: url, file: virtualName});
				case "heap":
				case "icu":
					offset = this.mono_wasm_load_bytes_into_heap (bytes);
					ctx.loaded_assets[virtualName] = [offset, bytes.length];
					break;

				case "vfs":
					// FIXME
					var lastSlash = virtualName.lastIndexOf("/");
					var parentDirectory = (lastSlash > 0)
						? virtualName.substr(0, lastSlash)
						: null;
					var fileName = (lastSlash > 0)
						? virtualName.substr(lastSlash + 1)
						: virtualName;
					if (fileName.startsWith("/"))
						fileName = fileName.substr(1);
					if (parentDirectory) {
						if (ctx.tracing)
							console.log ("MONO_WASM: Creating directory '" + parentDirectory + "'");

						var pathRet = ctx.createPath(
							"/", parentDirectory, true, true // fixme: should canWrite be false?
						);
					} else {
						parentDirectory = "/";
					}

					if (ctx.tracing)
						console.log ("MONO_WASM: Creating file '" + fileName + "' in directory '" + parentDirectory + "'");

					if (!this.mono_wasm_load_data_archive (bytes, parentDirectory)) {
						var fileRet = ctx.createDataFile (
							parentDirectory, fileName,
							bytes, true /* canRead */, true /* canWrite */, true /* canOwn */
						);
					}
					break;

				default:
					throw new Error ("Unrecognized asset behavior:", asset.behavior, "for asset", asset.name);
			}

			if (asset.behavior === "assembly") {
				var hasPpdb = ctx.mono_wasm_add_assembly (virtualName, offset, bytes.length);

				if (!hasPpdb) {
					var index = ctx.loaded_files.findIndex(element => element.file == virtualName);
					ctx.loaded_files.splice(index, 1);
				}
			}
			else if (asset.behavior === "icu") {
				if (this.mono_wasm_load_icu_data (offset))
					ctx.num_icu_assets_loaded_successfully += 1;
				else
					console.error ("Error loading ICU asset", asset.name);
			}
			else if (asset.behavior === "resource") {
				ctx.mono_wasm_add_satellite_assembly (virtualName, asset.culture, offset, bytes.length);
			}
		},

		// deprecated
		mono_load_runtime_and_bcl: function (
			unused_vfs_prefix, deploy_prefix, debug_level, file_list, loaded_cb, fetch_file_cb
		) {
			var args = {
				fetch_file_cb: fetch_file_cb,
				loaded_cb: loaded_cb,
				debug_level: debug_level,
				assembly_root: deploy_prefix,
				assets: []
			};

			for (var i = 0; i < file_list.length; i++) {
				var file_name = file_list[i];
				var behavior;
				if (file_name.startsWith ("icudt") && file_name.endsWith (".dat")) {
					// ICU data files are expected to be "icudt%FilterName%.dat"
					behavior = "icu";
				} else { // if (file_name.endsWith (".pdb") || file_name.endsWith (".dll"))
					behavior = "assembly";
				}

				args.assets.push ({
					name: file_name,
					behavior: behavior
				});
			}

			return this.mono_load_runtime_and_bcl_args (args);
		},

		// Initializes the runtime and loads assemblies, debug information, and other files.
		// @args is a dictionary-style Object with the following properties:
		//    assembly_root: (required) the subfolder containing managed assemblies and pdbs
		//    debug_level or enable_debugging: (required)
		//    assets: (required) a list of assets to load along with the runtime. each asset
		//     is a dictionary-style Object with the following properties:
		//        name: (required) the name of the asset, including extension.
		//        behavior: (required) determines how the asset will be handled once loaded:
		//          "heap": store asset into the native heap
		//          "assembly": load asset as a managed assembly (or debugging information)
		//          "resource": load asset as a managed resource assembly
		//          "icu": load asset as an ICU data archive
		//          "vfs": load asset into the virtual filesystem (for fopen, File.Open, etc)
		//        load_remote: (optional) if true, an attempt will be made to load the asset
		//          from each location in @args.remote_sources.
		//        virtual_path: (optional) if specified, overrides the path of the asset in
		//          the virtual filesystem and similar data structures once loaded.
		//        is_optional: (optional) if true, any failure to load this asset will be ignored.
		//    loaded_cb: (required) a function () invoked when loading has completed.
		//    fetch_file_cb: (optional) a function (string) invoked to fetch a given file.
		//      If no callback is provided a default implementation appropriate for the current
		//      environment will be selected (readFileSync in node, fetch elsewhere).
		//      If no default implementation is available this call will fail.
		//    remote_sources: (optional) additional search locations for assets.
		//      sources will be checked in sequential order until the asset is found.
		//      the string "./" indicates to load from the application directory (as with the
		//      files in assembly_list), and a fully-qualified URL like "https://example.com/" indicates
		//      that asset loads can be attempted from a remote server. Sources must end with a "/".
		//    environment_variables: (optional) dictionary-style Object containing environment variables
		//    runtime_options: (optional) array of runtime options as strings
		//    aot_profiler_options: (optional) dictionary-style Object. see the comments for
		//      mono_wasm_init_aot_profiler. If omitted, aot profiler will not be initialized.
		//    coverage_profiler_options: (optional) dictionary-style Object. see the comments for
		//      mono_wasm_init_coverage_profiler. If omitted, coverage profiler will not be initialized.
		//    globalization_mode: (optional) configures the runtime's globalization mode:
		//      "icu": load ICU globalization data from any runtime assets with behavior "icu".
		//      "invariant": operate in invariant globalization mode.
		//      "auto" (default): if "icu" behavior assets are present, use ICU, otherwise invariant.
		//    diagnostic_tracing: (optional) enables diagnostic log messages during startup
		mono_load_runtime_and_bcl_args: function (args) {
			try {
				return this._load_assets_and_runtime (args);
			} catch (exc) {
				console.error ("error in mono_load_runtime_and_bcl_args:", exc);
				throw exc;
			}
		},

		// @bytes must be a typed array. space is allocated for it in the native heap
		//  and it is copied to that location. returns the address of the allocation.
		mono_wasm_load_bytes_into_heap: function (bytes) {
			var memoryOffset = Module._malloc (bytes.length);
			var heapBytes = new Uint8Array (Module.HEAPU8.buffer, memoryOffset, bytes.length);
			heapBytes.set (bytes);
			return memoryOffset;
		},

		num_icu_assets_loaded_successfully: 0,

		// @offset must be the address of an ICU data archive in the native heap.
		// returns true on success.
		mono_wasm_load_icu_data: function (offset) {
			var fn = Module.cwrap ('mono_wasm_load_icu_data', 'number', ['number']);
			var ok = (fn (offset)) === 1;
			if (ok)
				this.num_icu_assets_loaded_successfully++;
			return ok;
		},

		// Get icudt.dat exact filename that matches given culture, examples:
		//   "ja" -> "icudt_CJK.dat"
		//   "en_US" (or "en-US" or just "en") -> "icudt_EFIGS.dat"
		// etc, see "mono_wasm_get_icudt_name" implementation in pal_icushim_static.c
		mono_wasm_get_icudt_name: function (culture) {
			return Module.ccall ('mono_wasm_get_icudt_name', 'string', ['string'], [culture]);
		},

		_finalize_startup: function (args, ctx) {
			var loaded_files_with_debug_info = [];

			MONO.loaded_assets = ctx.loaded_assets;
			ctx.loaded_files.forEach(value => loaded_files_with_debug_info.push(value.url));
			MONO.loaded_files = loaded_files_with_debug_info;
			if (ctx.tracing) {
				console.log ("MONO_WASM: loaded_assets: " + JSON.stringify(ctx.loaded_assets));
				console.log ("MONO_WASM: loaded_files: " + JSON.stringify(ctx.loaded_files));
			}

			var load_runtime = Module.cwrap ('mono_wasm_load_runtime', null, ['string', 'number']);

			console.debug ("MONO_WASM: Initializing mono runtime");

			this.mono_wasm_globalization_init (args.globalization_mode);

			if (ENVIRONMENT_IS_SHELL || ENVIRONMENT_IS_NODE) {
				try {
					load_runtime ("unused", args.debug_level);
				} catch (ex) {
					print ("MONO_WASM: load_runtime () failed: " + ex);
					print ("MONO_WASM: Stacktrace: \n");
					print (ex.stack);

					var wasm_exit = Module.cwrap ('mono_wasm_exit', null, ['number']);
					wasm_exit (1);
				}
			} else {
				load_runtime ("unused", args.debug_level);
			}

			let tz;
			try {
				tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			} catch {}
			MONO.mono_wasm_setenv ("TZ", tz || "UTC");
			MONO.mono_wasm_runtime_ready ();
			args.loaded_cb ();
		},

		_load_assets_and_runtime: function (args) {
			if (args.enable_debugging)
				args.debug_level = args.enable_debugging;
			if (args.assembly_list)
				throw new Error ("Invalid args (assembly_list was replaced by assets)");
			if (args.runtime_assets)
				throw new Error ("Invalid args (runtime_assets was replaced by assets)");
			if (args.runtime_asset_sources)
				throw new Error ("Invalid args (runtime_asset_sources was replaced by remote_sources)");
			if (!args.loaded_cb)
				throw new Error ("loaded_cb not provided");

			var ctx = {
				tracing: args.diagnostic_tracing || false,
				pending_count: args.assets.length,
				mono_wasm_add_assembly: Module.cwrap ('mono_wasm_add_assembly', 'number', ['string', 'number', 'number']),
				mono_wasm_add_satellite_assembly: Module.cwrap ('mono_wasm_add_satellite_assembly', 'void', ['string', 'string', 'number', 'number']),
				loaded_assets: Object.create (null),
				// dlls and pdbs, used by blazor and the debugger
				loaded_files: [],
				createPath: Module['FS_createPath'],
				createDataFile: Module['FS_createDataFile']
			};

			if (ctx.tracing)
				console.log ("mono_wasm_load_runtime_with_args", JSON.stringify(args));

			this._apply_configuration_from_args (args);

			var fetch_file_cb = this._get_fetch_file_cb_from_args (args);

			var onPendingRequestComplete = function () {
				--ctx.pending_count;

				if (ctx.pending_count === 0) {
					try {
						MONO._finalize_startup (args, ctx);
					} catch (exc) {
						console.error ("Unhandled exception in _finalize_startup", exc);
						throw exc;
					}
				}
			};

			var processFetchResponseBuffer = function (asset, url, blob) {
				try {
					MONO._handle_loaded_asset (ctx, asset, url, blob);
				} catch (exc) {
					console.error ("Unhandled exception in processFetchResponseBuffer", exc);
					throw exc;
				} finally {
					onPendingRequestComplete ();
				}
			};

			args.assets.forEach (function (asset) {
				var attemptNextSource;
				var sourceIndex = 0;
				var sourcesList = asset.load_remote ? args.remote_sources : [""];

				var handleFetchResponse = function (response) {
					if (!response.ok) {
						try {
							attemptNextSource ();
							return;
						} catch (exc) {
							console.error ("MONO_WASM: Unhandled exception in handleFetchResponse attemptNextSource for asset", asset.name, exc);
							throw exc;
						}
					}

					try {
						var bufferPromise = response ['arrayBuffer'] ();
						bufferPromise.then (processFetchResponseBuffer.bind (this, asset, response.url));
					} catch (exc) {
						console.error ("MONO_WASM: Unhandled exception in handleFetchResponse for asset", asset.name, exc);
						attemptNextSource ();
					}
				};

				attemptNextSource = function () {
					if (sourceIndex >= sourcesList.length) {
						var msg = "MONO_WASM: Failed to load " + asset.name;
						try {
							var isOk = asset.is_optional ||
								(asset.name.match (/\.pdb$/) && MONO.mono_wasm_ignore_pdb_load_errors);

							if (isOk)
								console.debug (msg);
							else {
								console.error (msg);
								throw new Error (msg);
							}
						} finally {
							onPendingRequestComplete ();
						}
					}

					var sourcePrefix = sourcesList[sourceIndex];
					sourceIndex++;

					// HACK: Special-case because MSBuild doesn't allow "" as an attribute
					if (sourcePrefix === "./")
						sourcePrefix = "";

					var attemptUrl;
					if (sourcePrefix.trim() === "") {
						if (asset.behavior === "assembly")
							attemptUrl = locateFile (args.assembly_root + "/" + asset.name);
						else if (asset.behavior === "resource") {
							var path = asset.culture !== '' ? `${asset.culture}/${asset.name}` : asset.name;
							attemptUrl = locateFile (args.assembly_root + "/" + path);
						}
						else
							attemptUrl = asset.name;
					} else {
						attemptUrl = sourcePrefix + asset.name;
					}

					try {
						if (asset.name === attemptUrl) {
							if (ctx.tracing)
								console.log ("Attempting to fetch '" + attemptUrl + "'");
						} else {
							if (ctx.tracing)
								console.log ("Attempting to fetch '" + attemptUrl + "' for", asset.name);
						}
						var fetch_promise = fetch_file_cb (attemptUrl);
						fetch_promise.then (handleFetchResponse);
					} catch (exc) {
						console.error ("MONO_WASM: Error fetching " + attemptUrl, exc);
						attemptNextSource ();
					}
				};

				attemptNextSource ();
			});
		},

		// Performs setup for globalization.
		// @globalization_mode is one of "icu", "invariant", or "auto".
		// "auto" will use "icu" if any ICU data archives have been loaded,
		//  otherwise "invariant".
		mono_wasm_globalization_init: function (globalization_mode) {
			var invariantMode = false;

			if (globalization_mode === "invariant")
				invariantMode = true;

			if (!invariantMode) {
				if (this.num_icu_assets_loaded_successfully > 0) {
					console.debug ("MONO_WASM: ICU data archive(s) loaded, disabling invariant mode");
				} else if (globalization_mode !== "icu") {
					console.debug ("MONO_WASM: ICU data archive(s) not loaded, using invariant globalization mode");
					invariantMode = true;
				} else {
					var msg = "invariant globalization mode is inactive and no ICU data archives were loaded";
					console.error ("MONO_WASM: ERROR: " + msg);
					throw new Error (msg);
				}
			}

			if (invariantMode)
				this.mono_wasm_setenv ("DOTNET_SYSTEM_GLOBALIZATION_INVARIANT", "1");
			
			// Set globalization mode to PredefinedCulturesOnly
			this.mono_wasm_setenv ("DOTNET_SYSTEM_GLOBALIZATION_PREDEFINED_CULTURES_ONLY", "1");
		},

		// Used by the debugger to enumerate loaded dlls and pdbs
		mono_wasm_get_loaded_files: function() {
			if (!this.mono_wasm_set_is_debugger_attached)
				this.mono_wasm_set_is_debugger_attached = Module.cwrap ('mono_wasm_set_is_debugger_attached', 'void', ['bool']);
			this.mono_wasm_set_is_debugger_attached (true);
			return MONO.loaded_files;
		},

		mono_wasm_get_loaded_asset_table: function() {
			return MONO.loaded_assets;
		},

		mono_wasm_clear_all_breakpoints: function() {
			if (!this.mono_clear_bps)
				this.mono_clear_bps = Module.cwrap ('mono_wasm_clear_all_breakpoints', null);

			this.mono_clear_bps ();
		},

		mono_wasm_add_null_var: function(className)
		{
			let fixed_class_name = MONO._mono_csharp_fixup_class_name(Module.UTF8ToString (className));
			if (!fixed_class_name) {
				// Eg, when a @className is passed from js itself, like
				// mono_wasm_add_null_var ("string")
				fixed_class_name = className;
			}
			MONO.var_info.push ({value: {
				type: "object",
				className: fixed_class_name,
				description: fixed_class_name,
				subtype: "null"
			}});
		},

		_mono_wasm_add_string_var: function(var_value) {
			if (var_value === 0) {
				MONO.mono_wasm_add_null_var ("string");
				return;
			}

			MONO.var_info.push({
				value: {
					type: "string",
					value: var_value,
					description: var_value
				}
			});
		},

		_mono_wasm_add_getter_var: function(className) {
			const fixed_class_name = MONO._mono_csharp_fixup_class_name (className);
			var name;
			if (MONO.var_info.length > 0)
				name = MONO.var_info [MONO.var_info.length - 1].name;
			name = (name === undefined) ? "" : name;

			MONO.var_info.push({
				get: {
					className: "Function",
					description: `get ${name} () {}`,
					type: "function",
				}
			});
		},

		_mono_wasm_add_array_var: function(className, objectId, length) {
			const fixed_class_name = MONO._mono_csharp_fixup_class_name(className);
			if (objectId == 0) {
				MONO.mono_wasm_add_null_var (fixed_class_name);
				return;
			}

			MONO.var_info.push({
				value: {
					type: "object",
					subtype: "array",
					className: fixed_class_name,
					description: `${fixed_class_name}(${length})`,
					objectId: this._new_or_add_id_props ({ scheme: 'array', idArgs: { arrayId: objectId } })
				}
			});
		},

		// FIXME: improve
		_base64_to_uint8: function (base64String) {
			const byteCharacters = atob (base64String);
			const byteNumbers = new Array(byteCharacters.length);
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}

			return new Uint8Array (byteNumbers);
		},

		_begin_value_type_var: function(className, args) {
			if (args === undefined || (typeof args !== 'object')) {
				console.debug (`_begin_value_type_var: Expected an args object`);
				return;
			}

			const fixed_class_name = MONO._mono_csharp_fixup_class_name(className);
			const toString = args.toString;
			const base64String = btoa (String.fromCharCode (...new Uint8Array (Module.HEAPU8.buffer, args.value_addr, args.value_size)));
			const vt_obj = {
				value: {
					type            : "object",
					className       : fixed_class_name,
					description     : (toString === 0 ? fixed_class_name: Module.UTF8ToString (toString)),
					expanded        : true,
					isValueType     : true,
					__extra_vt_props: { klass: args.klass, value64: base64String },
					members         : []
				}
			};
			if (MONO._vt_stack.length == 0)
				MONO._old_var_info = MONO.var_info;

			MONO.var_info = vt_obj.value.members;
			MONO._vt_stack.push (vt_obj);
		},

		_end_value_type_var: function() {
			let top_vt_obj_popped = MONO._vt_stack.pop ();
			top_vt_obj_popped.value.members = MONO._filter_automatic_properties (
								MONO._fixup_name_value_objects (top_vt_obj_popped.value.members));

			if (MONO._vt_stack.length == 0) {
				MONO.var_info = MONO._old_var_info;
				MONO.var_info.push(top_vt_obj_popped);
			} else {
				var top_obj = MONO._vt_stack [MONO._vt_stack.length - 1];
				top_obj.value.members.push (top_vt_obj_popped);
				MONO.var_info = top_obj.value.members;
			}
		},

		_add_valuetype_unexpanded_var: function(className, args) {
			if (args === undefined || (typeof args !== 'object')) {
				console.debug (`_add_valuetype_unexpanded_var: Expected an args object`);
				return;
			}

			const fixed_class_name = MONO._mono_csharp_fixup_class_name (className);
			const toString = args.toString;

			MONO.var_info.push ({
				value: {
					type: "object",
					className: fixed_class_name,
					description: (toString === 0 ? fixed_class_name : Module.UTF8ToString (toString)),
					isValueType: true
				}
			});
		},

		mono_wasm_add_properties_var: function (name, args) {
			if (typeof args !== 'object')
				args = { field_offset: args };

			if (args.owner_class !== undefined && args.owner_class !== 0)
				args.owner_class = Module.UTF8ToString(args.owner_class);

			let name_obj = {
				name: Module.UTF8ToString (name),
				fieldOffset: args.field_offset,
				__args: args
			};
			if (args.is_own)
				name_obj.isOwn = true;

			MONO.var_info.push(name_obj);
		},

		mono_wasm_add_typed_value: function (type, str_value, value) {
			let type_str = type;
			if (typeof type != 'string')
				type_str = Module.UTF8ToString (type);

			if (str_value !== 0)
				str_value = Module.UTF8ToString (str_value);

			switch (type_str) {
			case "bool": {
				const v = value != 0;
				MONO.var_info.push ({
					value: {
						type: "boolean",
						value: v,
						description: v.toString ()
					}
				});
				break;
			}

			case "char": {
				const v = `${value} '${String.fromCharCode (value)}'`;
				MONO.var_info.push ({
					value: {
						type: "symbol",
						value: v,
						description: v
					}
				});
				break;
			}

			case "number":
				MONO.var_info.push ({
					value: {
						type: "number",
						value: value,
						description: '' + value
					}
				});
				break;

			case "string":
				MONO._mono_wasm_add_string_var (str_value);
				break;

			case "getter":
				MONO._mono_wasm_add_getter_var (str_value);
				break;

			case "array":
				MONO._mono_wasm_add_array_var (str_value, value.objectId, value.length);
				break;

			case "begin_vt":
				MONO._begin_value_type_var (str_value, value);
				break;

			case "end_vt":
				MONO._end_value_type_var ();
				break;

			case "unexpanded_vt":
				MONO._add_valuetype_unexpanded_var (str_value, value);
				break;

			case "pointer": {
				const fixed_value_str = MONO._mono_csharp_fixup_class_name (str_value);
				if (value.klass_addr == 0 || value.ptr_addr == 0 || fixed_value_str.startsWith ('(void*')) {
					// null or void*, which we can't deref
					MONO.var_info.push({
						value: {
							type: "symbol",
							value: fixed_value_str,
							description: fixed_value_str
						}
					});
				} else {
					MONO.var_info.push({
						value: {
							type: "object",
							className: fixed_value_str,
							description: fixed_value_str,
							objectId: this._new_or_add_id_props ({ scheme: 'pointer', props: value })
						}
					});
				}
				}
				break;

			case "symbol": {
				if (typeof value === 'object' && value.isClassName)
					str_value = MONO._mono_csharp_fixup_class_name (str_value);

				MONO.var_info.push ({
					value: {
						type: "symbol",
						value: str_value,
						description: str_value
					}
				});
				}
				break;

			default: {
				const msg = `'${str_value}' ${value}`;

				MONO.var_info.push ({
					value: {
						type: "symbol",
						value: msg,
						description: msg
					}
				});
				break;
				}
			}
		},

		_mono_csharp_fixup_class_name: function(className)
		{
			// Fix up generic names like Foo`2<int, string> to Foo<int, string>
			// and nested class names like Foo/Bar to Foo.Bar
			return className.replace(/\//g, '.').replace(/`\d+/g, '');
		},

		mono_wasm_load_data_archive: function (data, prefix) {
			if (data.length < 8)
				return false;

			var dataview = new DataView(data.buffer);
			var magic = dataview.getUint32(0, true);
			//	get magic number
			if (magic != 0x626c6174) {
				return false;
			}
			var manifestSize = dataview.getUint32(4, true);
			if (manifestSize == 0 || data.length < manifestSize + 8)
				return false;

			var manifest;
			try {
				manifestContent = Module.UTF8ArrayToString(data, 8, manifestSize);
				manifest = JSON.parse(manifestContent);
				if (!(manifest instanceof Array))
					return false;
			} catch (exc) {
				return false;
			}

			data = data.slice(manifestSize+8);

			// Create the folder structure
			// /usr/share/zoneinfo
			// /usr/share/zoneinfo/Africa
			// /usr/share/zoneinfo/Asia
			// ..

			var folders = new Set()
			manifest.filter(m => {
				var file = m[0];
				var last = file.lastIndexOf ("/");
				var directory = file.slice (0, last+1);
				folders.add(directory);
			});
			folders.forEach(folder => {
				Module['FS_createPath'](prefix, folder, true, true);
			});

			for (row of manifest) {
				var name = row[0];
				var length = row[1];
				var bytes = data.slice(0, length);
				Module['FS_createDataFile'](prefix, name, bytes, true, true);
				data = data.slice(length);
			}
			return true;
		},

		/**
		 * Raises an event for the debug proxy
		 *
		 * @param {Event} event - event to be raised
		 * @param {object} args - arguments for raising this event, eg. `{trace: true}`
		 */
		mono_wasm_raise_debug_event: function(event, args={}) {
			if (typeof event !== 'object')
				throw new Error(`event must be an object, but got ${JSON.stringify(event)}`);

			if (event.eventName === undefined)
				throw new Error(`event.eventName is a required parameter, in event: ${JSON.stringify(event)}`);

			if (typeof args !== 'object')
				throw new Error(`args must be an object, but got ${JSON.stringify(args)}`);

			console.debug('mono_wasm_debug_event_raised:aef14bca-5519-4dfe-b35a-f867abc123ae', JSON.stringify(event), JSON.stringify(args));
		},
	},

	mono_wasm_add_typed_value: function (type, str_value, value) {
		MONO.mono_wasm_add_typed_value (type, str_value, value);
	},

	mono_wasm_add_properties_var: function(name, args) {
		MONO.mono_wasm_add_properties_var (name, args);
	},

	mono_wasm_set_is_async_method: function(objectId) {
		MONO._async_method_objectId = objectId;
	},

	mono_wasm_add_enum_var: function(className, members, value) {
		// FIXME: flags
		//

		// group0: Monday:0
		// group1: Monday
		// group2: 0
		const re = new RegExp (`[,]?([^,:]+):(${value}(?=,)|${value}$)`, 'g')
		const members_str = Module.UTF8ToString (members);

		const match = re.exec(members_str);
		const member_name = match == null ? ('' + value) : match [1];

		const fixed_class_name = MONO._mono_csharp_fixup_class_name(Module.UTF8ToString (className));
		MONO.var_info.push({
			value: {
				type: "object",
				className: fixed_class_name,
				description: member_name,
				isEnum: true
			}
		});
	},

	mono_wasm_add_array_item: function(position) {
		MONO.var_info.push({
			name: `${position}`
		});
	},

	mono_wasm_add_obj_var: function(className, toString, objectId) {
		if (objectId == 0) {
			MONO.mono_wasm_add_null_var (className);
			return;
		}

		const fixed_class_name = MONO._mono_csharp_fixup_class_name(Module.UTF8ToString (className));
		MONO.var_info.push({
			value: {
				type: "object",
				className: fixed_class_name,
				description: (toString === 0 ? fixed_class_name : Module.UTF8ToString (toString)),
				objectId: "dotnet:object:"+ objectId,
			}
		});
	},

	/*
	 * @className, and @targetName are in the following format:
	 *
	 *  <ret_type>:[<comma separated list of arg types>]:<method name>
	 */
	mono_wasm_add_func_var: function (className, targetName, objectId) {
		if (objectId == 0) {
			MONO.mono_wasm_add_null_var (
				MONO._mono_csharp_fixup_class_name (Module.UTF8ToString (className)));
			return;
		}

		function args_to_sig (args_str) {
			var parts = args_str.split (":");
			// TODO: min length = 3?
			parts = parts.map (a => MONO._mono_csharp_fixup_class_name (a));

			// method name at the end
			var method_name = parts.pop ();

			// ret type at the beginning
			var ret_sig = parts [0];
			var args_sig = parts.splice (1).join (', ');
			return `${ret_sig} ${method_name} (${args_sig})`;
		}
		let tgt_sig;
		if (targetName != 0)
			tgt_sig = args_to_sig (Module.UTF8ToString (targetName));

		const type_name = MONO._mono_csharp_fixup_class_name (Module.UTF8ToString (className));
		if (tgt_sig === undefined)
			tgt_sig = type_name;

		if (objectId == -1 || targetName === 0) {
			// Target property
			MONO.var_info.push ({
				value: {
					type: "symbol",
					value: tgt_sig,
					description: tgt_sig,
				}
			});
		} else {
			MONO.var_info.push ({
				value: {
					type: "object",
					className: type_name,
					description: tgt_sig,
					objectId: "dotnet:object:" + objectId,
				}
			});
		}
	},

	mono_wasm_add_frame: function(il, method, frame_id, assembly_name, method_full_name) {
		var parts = Module.UTF8ToString (method_full_name).split (":", 2);
		MONO.active_frames.push( {
			il_pos: il,
			method_token: method,
			assembly_name: Module.UTF8ToString (assembly_name),
			// Extract just the method name from `{class_name}:{method_name}`
			method_name: parts [parts.length - 1],
			frame_id
		});
	},

	schedule_background_exec: function () {
		++MONO.pump_count;
		if (typeof globalThis.setTimeout === 'function') {
			globalThis.setTimeout (MONO.pump_message, 0);
		}
	},

	mono_set_timeout: function (timeout, id) {
		if (!this.mono_set_timeout_exec)
			this.mono_set_timeout_exec = Module.cwrap ("mono_set_timeout_exec", null, [ 'number' ]);

		if (typeof globalThis.setTimeout === 'function') {
			globalThis.setTimeout (function () {
				this.mono_set_timeout_exec (id);
			}, timeout);
		} else {
			++MONO.pump_count;
			MONO.timeout_queue.push(function() {
				this.mono_set_timeout_exec (id);
			})
		}
	},

	mono_wasm_fire_bp: function () {
		// eslint-disable-next-line no-debugger
		debugger;
	},

	mono_wasm_fire_exception: function (exception_id, message, class_name, uncaught) {
		MONO.active_exception = {
			exception_id: exception_id,
			message     : Module.UTF8ToString (message),
			class_name  : Module.UTF8ToString (class_name),
			uncaught    : uncaught
		};
		debugger;
	},

	mono_wasm_asm_loaded: function (assembly_name, assembly_ptr, assembly_len, pdb_ptr, pdb_len) {
		// Only trigger this codepath for assemblies loaded after app is ready
		if (MONO.mono_wasm_runtime_is_ready !== true)
			return;

		const assembly_name_str = assembly_name !== 0 ? Module.UTF8ToString(assembly_name).concat('.dll') : '';

		const assembly_data = new Uint8Array(Module.HEAPU8.buffer, assembly_ptr, assembly_len);
		const assembly_b64 = MONO._base64Converter.toBase64StringImpl(assembly_data);

		let pdb_b64;
		if (pdb_ptr) {
			const pdb_data = new Uint8Array(Module.HEAPU8.buffer, pdb_ptr, pdb_len);
			pdb_b64 = MONO._base64Converter.toBase64StringImpl(pdb_data);
		}

		MONO.mono_wasm_raise_debug_event({
			eventName: 'AssemblyLoaded',
			assembly_name: assembly_name_str,
			assembly_b64,
			pdb_b64
		});
	},
};

autoAddDeps(MonoSupportLib, '$MONO')
mergeInto(LibraryManager.library, MonoSupportLib)

// SIG // Begin signature block
// SIG // MIIjkAYJKoZIhvcNAQcCoIIjgTCCI30CAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // V3wdb3nUpJ+ab9kO1EcQTEFhYOT8qhzoIbQyvxCNkZyg
// SIG // gg2BMIIF/zCCA+egAwIBAgITMwAAAd9r8C6Sp0q00AAA
// SIG // AAAB3zANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIwMTIxNTIxMzE0NVoX
// SIG // DTIxMTIwMjIxMzE0NVowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // trsZWRAAo6nx5LhcqAsHy9uaHyPQ2VireMBI9yQUOPBj
// SIG // 7dVLA7/N+AnKFFDzJ7P+grT6GkOE4cv5GzjoP8yQJ6yX
// SIG // ojEKkXti7HW/zUiNoF11/ZWndf8j1Azl6OBjcD416tSW
// SIG // Yvh2VfdW1K+mY83j49YPm3qbKnfxwtV0nI9H092gMS0c
// SIG // pCUsxMRAZlPXksrjsFLqvgq4rnULVhjHSVOudL/yps3z
// SIG // OOmOpaPzAp56b898xC+zzHVHcKo/52IRht1FSC8V+7QH
// SIG // TG8+yzfuljiKU9QONa8GqDlZ7/vFGveB8IY2ZrtUu98n
// SIG // le0WWTcaIRHoCYvWGLLF2u1GVFJAggPipwIDAQABo4IB
// SIG // fjCCAXowHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFDj2zC/CHZDRrQnzJlT7byOl
// SIG // WfPjMFAGA1UdEQRJMEekRTBDMSkwJwYDVQQLEyBNaWNy
// SIG // b3NvZnQgT3BlcmF0aW9ucyBQdWVydG8gUmljbzEWMBQG
// SIG // A1UEBRMNMjMwMDEyKzQ2MzAwOTAfBgNVHSMEGDAWgBRI
// SIG // bmTlUAXTgqoXNzcitW2oynUClTBUBgNVHR8ETTBLMEmg
// SIG // R6BFhkNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtp
// SIG // b3BzL2NybC9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDct
// SIG // MDguY3JsMGEGCCsGAQUFBwEBBFUwUzBRBggrBgEFBQcw
// SIG // AoZFaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9w
// SIG // cy9jZXJ0cy9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDct
// SIG // MDguY3J0MAwGA1UdEwEB/wQCMAAwDQYJKoZIhvcNAQEL
// SIG // BQADggIBAJ56h7Q8mFBWlQJLwCtHqqup4aC/eUmULt0Z
// SIG // 6We7XUPPUEd/vuwPuIa6+1eMcZpAeQTm0tGCvjACxNNm
// SIG // rY8FoD3aWEOvFnSxq6CWR5G2XYBERvu7RExZd2iheCqa
// SIG // EmhjrJGV6Uz5wmjKNj16ADFTBqbEBELMIpmatyEN50UH
// SIG // wZSdD6DDHDf/j5LPGUy9QaD2LCaaJLenKpefaugsqWWC
// SIG // MIMifPdh6bbcmxyoNWbUC1JUl3HETJboD4BHDWSWoDxI
// SIG // D2J4uG9dbJ40QIH9HckNMyPWi16k8VlFOaQiBYj09G9s
// SIG // LMc0agrchqqZBjPD/RmszvHmqJlSLQmAXCUgcgcf6UtH
// SIG // EmMAQRwGcSTg1KsUl6Ehg75k36lCV57Z1pC+KJKJNRYg
// SIG // g2eI6clzkLp2+noCF75IEO429rjtujsNJvEcJXg74TjK
// SIG // 5x7LqYjj26Myq6EmuqWhbVUofPWm1EqKEfEHWXInppqB
// SIG // YXFpBMBYOLKc72DT+JyLNfd9utVsk2kTGaHHhrp+xgk9
// SIG // kZeud7lI/hfoPeHOtwIc0quJIXS+B5RSD9nj79vbJn1J
// SIG // x7RqusmBQy509Kv2Pg4t48JaBfBFpJB0bUrl5RVG05sK
// SIG // /5Qw4G6WYioS0uwgUw499iNC+Yud9vrh3M8PNqGQ5mJm
// SIG // JiFEjG2ToEuuYe/e64+SSejpHhFCaAFcMIIHejCCBWKg
// SIG // AwIBAgIKYQ6Q0gAAAAAAAzANBgkqhkiG9w0BAQsFADCB
// SIG // iDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEyMDAGA1UEAxMpTWlj
// SIG // cm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
// SIG // IDIwMTEwHhcNMTEwNzA4MjA1OTA5WhcNMjYwNzA4MjEw
// SIG // OTA5WjB+MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQD
// SIG // Ex9NaWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDEx
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // q/D6chAcLq3YbqqCEE00uvK2WCGfQhsqa+laUKq4Bjga
// SIG // BEm6f8MMHt03a8YS2AvwOMKZBrDIOdUBFDFC04kNeWSH
// SIG // fpRgJGyvnkmc6Whe0t+bU7IKLMOv2akrrnoJr9eWWcpg
// SIG // GgXpZnboMlImEi/nqwhQz7NEt13YxC4Ddato88tt8zpc
// SIG // oRb0RrrgOGSsbmQ1eKagYw8t00CT+OPeBw3VXHmlSSnn
// SIG // Db6gE3e+lD3v++MrWhAfTVYoonpy4BI6t0le2O3tQ5GD
// SIG // 2Xuye4Yb2T6xjF3oiU+EGvKhL1nkkDstrjNYxbc+/jLT
// SIG // swM9sbKvkjh+0p2ALPVOVpEhNSXDOW5kf1O6nA+tGSOE
// SIG // y/S6A4aN91/w0FK/jJSHvMAhdCVfGCi2zCcoOCWYOUo2
// SIG // z3yxkq4cI6epZuxhH2rhKEmdX4jiJV3TIUs+UsS1Vz8k
// SIG // A/DRelsv1SPjcF0PUUZ3s/gA4bysAoJf28AVs70b1FVL
// SIG // 5zmhD+kjSbwYuER8ReTBw3J64HLnJN+/RpnF78IcV9uD
// SIG // jexNSTCnq47f7Fufr/zdsGbiwZeBe+3W7UvnSSmnEyim
// SIG // p31ngOaKYnhfsi+E11ecXL93KCjx7W3DKI8sj0A3T8Hh
// SIG // hUSJxAlMxdSlQy90lfdu+HggWCwTXWCVmj5PM4TasIgX
// SIG // 3p5O9JawvEagbJjS4NaIjAsCAwEAAaOCAe0wggHpMBAG
// SIG // CSsGAQQBgjcVAQQDAgEAMB0GA1UdDgQWBBRIbmTlUAXT
// SIG // gqoXNzcitW2oynUClTAZBgkrBgEEAYI3FAIEDB4KAFMA
// SIG // dQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/BAUw
// SIG // AwEB/zAfBgNVHSMEGDAWgBRyLToCMZBDuRQFTuHqp8cx
// SIG // 0SOJNDBaBgNVHR8EUzBRME+gTaBLhklodHRwOi8vY3Js
// SIG // Lm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9N
// SIG // aWNSb29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3JsMF4G
// SIG // CCsGAQUFBwEBBFIwUDBOBggrBgEFBQcwAoZCaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNS
// SIG // b29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3J0MIGfBgNV
// SIG // HSAEgZcwgZQwgZEGCSsGAQQBgjcuAzCBgzA/BggrBgEF
// SIG // BQcCARYzaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3Br
// SIG // aW9wcy9kb2NzL3ByaW1hcnljcHMuaHRtMEAGCCsGAQUF
// SIG // BwICMDQeMiAdAEwAZQBnAGEAbABfAHAAbwBsAGkAYwB5
// SIG // AF8AcwB0AGEAdABlAG0AZQBuAHQALiAdMA0GCSqGSIb3
// SIG // DQEBCwUAA4ICAQBn8oalmOBUeRou09h0ZyKbC5YR4WOS
// SIG // mUKWfdJ5DJDBZV8uLD74w3LRbYP+vj/oCso7v0epo/Np
// SIG // 22O/IjWll11lhJB9i0ZQVdgMknzSGksc8zxCi1LQsP1r
// SIG // 4z4HLimb5j0bpdS1HXeUOeLpZMlEPXh6I/MTfaaQdION
// SIG // 9MsmAkYqwooQu6SpBQyb7Wj6aC6VoCo/KmtYSWMfCWlu
// SIG // WpiW5IP0wI/zRive/DvQvTXvbiWu5a8n7dDd8w6vmSiX
// SIG // mE0OPQvyCInWH8MyGOLwxS3OW560STkKxgrCxq2u5bLZ
// SIG // 2xWIUUVYODJxJxp/sfQn+N4sOiBpmLJZiWhub6e3dMNA
// SIG // BQamASooPoI/E01mC8CzTfXhj38cbxV9Rad25UAqZaPD
// SIG // XVJihsMdYzaXht/a8/jyFqGaJ+HNpZfQ7l1jQeNbB5yH
// SIG // PgZ3BtEGsXUfFL5hYbXw3MYbBL7fQccOKO7eZS/sl/ah
// SIG // XJbYANahRr1Z85elCUtIEJmAH9AAKcWxm6U/RXceNcbS
// SIG // oqKfenoi+kiVH6v7RyOA9Z74v2u3S5fi63V4GuzqN5l5
// SIG // GEv/1rMjaHXmr/r8i+sLgOppO6/8MO0ETI7f33VtY5E9
// SIG // 0Z1WTk+/gFcioXgRMiF670EKsT/7qMykXcGhiJtXcVZO
// SIG // SEXAQsmbdlsKgEhr/Xmfwb1tbWrJUnMTDXpQzTGCFWcw
// SIG // ghVjAgEBMIGVMH4xCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKDAm
// SIG // BgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25pbmcgUENB
// SIG // IDIwMTECEzMAAAHfa/AukqdKtNAAAAAAAd8wDQYJYIZI
// SIG // AWUDBAIBBQCgga4wGQYJKoZIhvcNAQkDMQwGCisGAQQB
// SIG // gjcCAQQwHAYKKwYBBAGCNwIBCzEOMAwGCisGAQQBgjcC
// SIG // ARUwLwYJKoZIhvcNAQkEMSIEIEIS03Zu71uN7EeC2plh
// SIG // FYRi+A7OU+kEYDn/Rw0xqR4rMEIGCisGAQQBgjcCAQwx
// SIG // NDAyoBSAEgBNAGkAYwByAG8AcwBvAGYAdKEagBhodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20wDQYJKoZIhvcNAQEB
// SIG // BQAEggEANFLpy/iyFlmLvQoEa+wz1f9olh0XVr/WbIe3
// SIG // b0kSgd9QZ19afJx+VhntGw/AO4zjn/eRf8TTdnhLUKdZ
// SIG // 2LoqwXhRVU5tjHqudigU6fNCtwb1gzyEv8ypmR1cyClo
// SIG // D0iGmXTUv12zirX72U/T2HRCcr+mIYg7NMAtHESJgMnq
// SIG // xCb2xMYLOzAS3eeISvPGZtMvYx9h3DvdgJ7dkd0HYtWE
// SIG // q+GCStpGOnl6I7TdZ7EfYpQR7lAG1JLo6ptwCvNMJEZF
// SIG // lvFw2NnqcdEmIkYUtmaUc9wK6Uw7bMSGLwRCc9Bl2Xqo
// SIG // HdCvZZk4Ly/kRgUySqs87BG42BdGO/EWdmx+/nv5GqGC
// SIG // EvEwghLtBgorBgEEAYI3AwMBMYIS3TCCEtkGCSqGSIb3
// SIG // DQEHAqCCEsowghLGAgEDMQ8wDQYJYIZIAWUDBAIBBQAw
// SIG // ggFVBgsqhkiG9w0BCRABBKCCAUQEggFAMIIBPAIBAQYK
// SIG // KwYBBAGEWQoDATAxMA0GCWCGSAFlAwQCAQUABCDjacWD
// SIG // wIuiq4u0lOMuYdTuAjm7mTtFH4w77xVpK/3m8AIGYGMq
// SIG // jfi5GBMyMDIxMDQwNTIxNDUxNS4yMDRaMASAAgH0oIHU
// SIG // pIHRMIHOMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSkwJwYDVQQL
// SIG // EyBNaWNyb3NvZnQgT3BlcmF0aW9ucyBQdWVydG8gUmlj
// SIG // bzEmMCQGA1UECxMdVGhhbGVzIFRTUyBFU046RjdBNi1F
// SIG // MjUxLTE1MEExJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFNlcnZpY2Wggg5EMIIE9TCCA92gAwIBAgIT
// SIG // MwAAAVmf/H5fLOryQwAAAAABWTANBgkqhkiG9w0BAQsF
// SIG // ADB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1N
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDAeFw0y
// SIG // MTAxMTQxOTAyMTVaFw0yMjA0MTExOTAyMTVaMIHOMQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSkwJwYDVQQLEyBNaWNyb3Nv
// SIG // ZnQgT3BlcmF0aW9ucyBQdWVydG8gUmljbzEmMCQGA1UE
// SIG // CxMdVGhhbGVzIFRTUyBFU046RjdBNi1FMjUxLTE1MEEx
// SIG // JTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNl
// SIG // cnZpY2UwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK
// SIG // AoIBAQCueMRhyWfEh0RLTSKAaPQBujK6PIBGQrfFoFf5
// SIG // jXSLdrTDj981WFOPrEbCJsU8H8yRAwVmk3Oy8ZRMv9d9
// SIG // Nn0Znf0dqcJ2O6ck/dMr2QJkEC2eg/n2hgcMIYua63v7
// SIG // ZgSXWwFxWfKi9iQ3OLcQZ99DK9QvAxQXayI8Gz/otkXQ
// SIG // DmksCLP8ULDHmQM97+Y/VRHcKvPojOmHC3Kiq2AMD/jh
// SIG // OfN+9Uk+ZI9n+6rk6Hk14Urw3MymK1aJC92Z9PijQJ26
// SIG // aeKx9bV8ppoF0HIFQs9RPxMvDRLL2dRY1eUD+qLwzE/G
// SIG // AKOys2mL0+CMfsTFb1vtf9TJ2GmqEfGy50MZk2TjAgMB
// SIG // AAGjggEbMIIBFzAdBgNVHQ4EFgQU9tCphUa8rfrk6yfX
// SIG // iMI8suk3Y+cwHwYDVR0jBBgwFoAU1WM6XIoxkPNDe3xG
// SIG // G8UzaFqFbVUwVgYDVR0fBE8wTTBLoEmgR4ZFaHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvTWljVGltU3RhUENBXzIwMTAtMDctMDEuY3JsMFoG
// SIG // CCsGAQUFBwEBBE4wTDBKBggrBgEFBQcwAoY+aHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNU
// SIG // aW1TdGFQQ0FfMjAxMC0wNy0wMS5jcnQwDAYDVR0TAQH/
// SIG // BAIwADATBgNVHSUEDDAKBggrBgEFBQcDCDANBgkqhkiG
// SIG // 9w0BAQsFAAOCAQEAjZFUEugPgYa3xjggFqNynLlGuHrL
// SIG // ac8p/mS5ZIdKSZgCaeBFA6y1rInmAn9qMqHPCo1TAvjR
// SIG // xRVbxy60jIVp0eRbWOpd2elK/SEwUs+uI+cE0URPLyKU
// SIG // Ih1WI0VTTxkdrYqhuZyj+frA9K2SOOuDhTc+J+3qwyTq
// SIG // VeyJtS/7AMH1/hh6HOI+a37gLkExWPNrHWL7RzOC08cF
// SIG // ffe7oZRbOdqB2qXRVtSl7erzMRF50l/LKEH1HfjPmKty
// SIG // e7nXOkfeNRrsX3egNL3nFeeiY75qQp4OI0ZKrgHsn/3S
// SIG // pkFGkdXyrwCwUQJmZAFLVoo0v9zJHkL/5VLx1aOxjxcy
// SIG // fzt8CTCCBnEwggRZoAMCAQICCmEJgSoAAAAAAAIwDQYJ
// SIG // KoZIhvcNAQELBQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // MjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENlcnRpZmlj
// SIG // YXRlIEF1dGhvcml0eSAyMDEwMB4XDTEwMDcwMTIxMzY1
// SIG // NVoXDTI1MDcwMTIxNDY1NVowfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTAwggEiMA0GCSqGSIb3DQEBAQUAA4IB
// SIG // DwAwggEKAoIBAQCpHQ28dxGKOiDs/BOX9fp/aZRrdFQQ
// SIG // 1aUKAIKF++18aEssX8XD5WHCdrc+Zitb8BVTJwQxH0Eb
// SIG // GpUdzgkTjnxhMFmxMEQP8WCIhFRDDNdNuDgIs0Ldk6zW
// SIG // czBXJoKjRQ3Q6vVHgc2/JGAyWGBG8lhHhjKEHnRhZ5Ff
// SIG // gVSxz5NMksHEpl3RYRNuKMYa+YaAu99h/EbBJx0kZxJy
// SIG // GiGKr0tkiVBisV39dx898Fd1rL2KQk1AUdEPnAY+Z3/1
// SIG // ZsADlkR+79BL/W7lmsqxqPJ6Kgox8NpOBpG2iAg16Hgc
// SIG // sOmZzTznL0S6p/TcZL2kAcEgCZN4zfy8wMlEXV4WnAEF
// SIG // TyJNAgMBAAGjggHmMIIB4jAQBgkrBgEEAYI3FQEEAwIB
// SIG // ADAdBgNVHQ4EFgQU1WM6XIoxkPNDe3xGG8UzaFqFbVUw
// SIG // GQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYDVR0P
// SIG // BAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0jBBgw
// SIG // FoAU1fZWy4/oolxiaNE9lJBb186aGMQwVgYDVR0fBE8w
// SIG // TTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQuY29t
// SIG // L3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0XzIw
// SIG // MTAtMDYtMjMuY3JsMFoGCCsGAQUFBwEBBE4wTDBKBggr
// SIG // BgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQuY29t
// SIG // L3BraS9jZXJ0cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0y
// SIG // My5jcnQwgaAGA1UdIAEB/wSBlTCBkjCBjwYJKwYBBAGC
// SIG // Ny4DMIGBMD0GCCsGAQUFBwIBFjFodHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vUEtJL2RvY3MvQ1BTL2RlZmF1bHQu
// SIG // aHRtMEAGCCsGAQUFBwICMDQeMiAdAEwAZQBnAGEAbABf
// SIG // AFAAbwBsAGkAYwB5AF8AUwB0AGEAdABlAG0AZQBuAHQA
// SIG // LiAdMA0GCSqGSIb3DQEBCwUAA4ICAQAH5ohRDeLG4Jg/
// SIG // gXEDPZ2joSFvs+umzPUxvs8F4qn++ldtGTCzwsVmyWrf
// SIG // 9efweL3HqJ4l4/m87WtUVwgrUYJEEvu5U4zM9GASinbM
// SIG // QEBBm9xcF/9c+V4XNZgkVkt070IQyK+/f8Z/8jd9Wj8c
// SIG // 8pl5SpFSAK84Dxf1L3mBZdmptWvkx872ynoAb0swRCQi
// SIG // PM/tA6WWj1kpvLb9BOFwnzJKJ/1Vry/+tuWOM7tiX5rb
// SIG // V0Dp8c6ZZpCM/2pif93FSguRJuI57BlKcWOdeyFtw5yj
// SIG // ojz6f32WapB4pm3S4Zz5Hfw42JT0xqUKloakvZ4argRC
// SIG // g7i1gJsiOCC1JeVk7Pf0v35jWSUPei45V3aicaoGig+J
// SIG // FrphpxHLmtgOR5qAxdDNp9DvfYPw4TtxCd9ddJgiCGHa
// SIG // sFAeb73x4QDf5zEHpJM692VHeOj4qEir995yfmFrb3ep
// SIG // gcunCaw5u+zGy9iCtHLNHfS4hQEegPsbiSpUObJb2sgN
// SIG // VZl6h3M7COaYLeqN4DMuEin1wC9UJyH3yKxO2ii4sanb
// SIG // lrKnQqLJzxlBTeCG+SqaoxFmMNO7dDJL32N79ZmKLxvH
// SIG // Ia9Zta7cRDyXUHHXodLFVeNp3lfB0d4wwP3M5k37Db9d
// SIG // T+mdHhk4L7zPWAUu7w2gUDXa7wknHNWzfjUeCLraNtvT
// SIG // X4/edIhJEqGCAtIwggI7AgEBMIH8oYHUpIHRMIHOMQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSkwJwYDVQQLEyBNaWNyb3Nv
// SIG // ZnQgT3BlcmF0aW9ucyBQdWVydG8gUmljbzEmMCQGA1UE
// SIG // CxMdVGhhbGVzIFRTUyBFU046RjdBNi1FMjUxLTE1MEEx
// SIG // JTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNl
// SIG // cnZpY2WiIwoBATAHBgUrDgMCGgMVACp2ywCPH4TufEgl
// SIG // q6WZ171xGbIRoIGDMIGApH4wfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTAwDQYJKoZIhvcNAQEFBQACBQDkFZHi
// SIG // MCIYDzIwMjEwNDA1MTc0MDUwWhgPMjAyMTA0MDYxNzQw
// SIG // NTBaMHcwPQYKKwYBBAGEWQoEATEvMC0wCgIFAOQVkeIC
// SIG // AQAwCgIBAAICJSgCAf8wBwIBAAICEXowCgIFAOQW42IC
// SIG // AQAwNgYKKwYBBAGEWQoEAjEoMCYwDAYKKwYBBAGEWQoD
// SIG // AqAKMAgCAQACAwehIKEKMAgCAQACAwGGoDANBgkqhkiG
// SIG // 9w0BAQUFAAOBgQCkCFjRomuBnGmLoH2O5+0m9Q8rageH
// SIG // 7BQyjYvaJstr88zHy2m39ylutgD9JrCD1Hc70riNtWU6
// SIG // LIhqzv2lVeWGTq1imOJR0w2G+AqfbJM3TIAZBMIXfJsS
// SIG // h8wlyYVFSLMc1Tdzq+gTl8hv2pNl/GWwyRbq2sLJN8hg
// SIG // JhNpa1IAFDGCAw0wggMJAgEBMIGTMHwxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFBDQSAyMDEwAhMzAAABWZ/8fl8s6vJDAAAA
// SIG // AAFZMA0GCWCGSAFlAwQCAQUAoIIBSjAaBgkqhkiG9w0B
// SIG // CQMxDQYLKoZIhvcNAQkQAQQwLwYJKoZIhvcNAQkEMSIE
// SIG // INZpa8kB5xuxDqFAJ3ed+UwiolgAMdx6NRZTOwA86dAK
// SIG // MIH6BgsqhkiG9w0BCRACLzGB6jCB5zCB5DCBvQQgAVgb
// SIG // z78w5nzXks5iU+PnRgPro/6qu/3ypFJ9+q8TQ+gwgZgw
// SIG // gYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQD
// SIG // Ex1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAIT
// SIG // MwAAAVmf/H5fLOryQwAAAAABWTAiBCBT0hrdvGDx4St+
// SIG // f0VuMGTMlHow6ZEXSP4smtz/SgJ0fzANBgkqhkiG9w0B
// SIG // AQsFAASCAQAv+Z0TzypwMoxZHBGhTjhakJpgyTdf/Xol
// SIG // ry+vnVnitsihd+yDJlqruKYJ4h6YgKjtU5/ypLcXLIJo
// SIG // CdYCWrIQSqMWorDLdH6fwL6GubL0zjhUDaLdTfw4meFB
// SIG // 3Sf8WXytQr1V7KgLk7YRuRCDEyGeqHjhnP0G1pQCH2z6
// SIG // dSjUj42zGPXAZjyhygzqB0DRzoT8QwQ3TN7ESclWO007
// SIG // FtOjOxT9EN4CKb3UCt2xqy2R/XOpjoreDKjzjmBWZSdJ
// SIG // RTPiDmvs0skUdCQD7ROBywA7i+Vl2K0n+RpKURfiGMx6
// SIG // 5wFvzZ5ZNVFJr+EGBP1Jc8LBhcz95UuhXYftDIusMVWD
// SIG // End signature block
