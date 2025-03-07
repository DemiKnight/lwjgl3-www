import { Binding, NATIVE_LTE_322, NATIVE_ALL, Native, Version } from '../types';
import type { BuildBindings, BindingDefinition } from '../types';

export default (prev: BuildBindings): BuildBindings => ({
  ...prev,
  version: Version.LWJGL330,
  byId: {
    ...prev.byId,
    [Binding.LWJGL]: { ...(prev.byId[Binding.LWJGL] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.ASSIMP]: { ...(prev.byId[Binding.ASSIMP] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.BGFX]: {
      ...(prev.byId[Binding.BGFX] as BindingDefinition),
      natives: [...NATIVE_LTE_322, Native.LinuxARM32, Native.LinuxARM64, Native.MacOSARM64, Native.WindowsX86],
    },
    [Binding.GLFW]: { ...(prev.byId[Binding.GLFW] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.JEMALLOC]: { ...(prev.byId[Binding.JEMALLOC] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.LIBDIVIDE]: { ...(prev.byId[Binding.LIBDIVIDE] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.LLVM]: { ...(prev.byId[Binding.LLVM] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.LMDB]: { ...(prev.byId[Binding.LMDB] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.LZ4]: { ...(prev.byId[Binding.LZ4] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.MEOW]: {
      ...(prev.byId[Binding.MEOW] as BindingDefinition),
      natives: [...NATIVE_LTE_322, Native.LinuxARM64, Native.MacOSARM64, Native.WindowsX86, Native.WindowsARM64],
    },
    [Binding.MESHOPTIMIZER]: {
      id: Binding.MESHOPTIMIZER,
      title: 'meshoptimizer',
      description: 'A mesh optimization library that makes meshes smaller and faster to render.',
      natives: NATIVE_ALL,
      website: 'https://github.com/zeux/meshoptimizer',
    },
    [Binding.NANOVG]: { ...(prev.byId[Binding.NANOVG] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.NFD]: { ...(prev.byId[Binding.NFD] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.NUKLEAR]: { ...(prev.byId[Binding.NUKLEAR] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.OPENAL]: { ...(prev.byId[Binding.OPENAL] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.OPENGL]: { ...(prev.byId[Binding.OPENGL] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.OPENGLES]: { ...(prev.byId[Binding.OPENGLES] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.OPUS]: { ...(prev.byId[Binding.OPUS] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.PAR]: { ...(prev.byId[Binding.PAR] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.REMOTERY]: {
      ...(prev.byId[Binding.REMOTERY] as BindingDefinition),
      natives: [...NATIVE_LTE_322, Native.LinuxARM32, Native.LinuxARM64, Native.MacOSARM64, Native.WindowsX86],
    },
    [Binding.RPMALLOC]: { ...(prev.byId[Binding.RPMALLOC] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.SHADERC]: { ...(prev.byId[Binding.SHADERC] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.SPVC]: {
      id: Binding.SPVC,
      title: 'SPIRV-Cross',
      description:
        'A library for performing reflection on SPIR-V and disassembling SPIR-V back to high level languages.',
      natives: NATIVE_ALL,
      website: 'https://github.com/KhronosGroup/SPIRV-Cross',
    },
    [Binding.STB]: { ...(prev.byId[Binding.STB] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.TINYEXR]: { ...(prev.byId[Binding.TINYEXR] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.TINYFD]: { ...(prev.byId[Binding.TINYFD] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.VMA]: { ...(prev.byId[Binding.VMA] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.VULKAN]: {
      ...(prev.byId[Binding.VULKAN] as BindingDefinition),
      natives: [Native.MacOS, Native.MacOSARM64],
    },
    [Binding.XXHASH]: { ...(prev.byId[Binding.XXHASH] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.YOGA]: { ...(prev.byId[Binding.YOGA] as BindingDefinition), natives: NATIVE_ALL },
    [Binding.ZSTD]: { ...(prev.byId[Binding.ZSTD] as BindingDefinition), natives: NATIVE_ALL },
  },
});
