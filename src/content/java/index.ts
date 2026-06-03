// Core Java content barrel — all topics exported from one place.
import type { TopicContent } from '../types';

// Fundamentals
import { javaArchitecture, javaJvm, javaJdkJre, javaDataTypes, javaOperators } from './fundamentals';

// OOP
import { javaClassesObjects, javaEncapsulation, javaInheritance, javaPolymorphism, javaAbstraction } from './oop';

// Collections
import {
  javaCollectionsList, javaCollectionsSet, javaCollectionsMap,
  javaArrayList, javaLinkedList, javaHashMap, javaHashSet,
} from './collections';

// Exception Handling
import { javaTryCatch, javaThrows, javaCustomExceptions } from './exceptions';

// Java 8+
import { javaLambda, javaFunctionalInterfaces, javaStreams, javaOptional } from './java8';

// Multithreading
import { javaThreads, javaRunnable, javaExecutorFramework, javaSynchronization, javaCompletableFuture } from './multithreading';

// Memory Management
import { javaHeapStack, javaGarbageCollection } from './memory';

// File Handling
import { javaFileApi, javaNio } from './filehandling';

// Advanced
import { javaGenerics, javaComparableComparator, javaSerialization, javaReflection } from './advanced';

export const javaContentMap: Record<string, TopicContent> = {
  // Fundamentals
  'java-architecture':  javaArchitecture,
  'java-jvm':           javaJvm,
  'java-jdk-jre':       javaJdkJre,
  'java-data-types':    javaDataTypes,
  'java-operators':     javaOperators,

  // OOP
  'java-classes-objects': javaClassesObjects,
  'java-encapsulation':   javaEncapsulation,
  'java-inheritance':     javaInheritance,
  'java-polymorphism':    javaPolymorphism,
  'java-abstraction':     javaAbstraction,

  // Collections
  'java-collections-list': javaCollectionsList,
  'java-collections-set':  javaCollectionsSet,
  'java-collections-map':  javaCollectionsMap,
  'java-arraylist':        javaArrayList,
  'java-linkedlist':       javaLinkedList,
  'java-hashmap':          javaHashMap,
  'java-hashset':          javaHashSet,

  // Exception Handling
  'java-exception-trycatch': javaTryCatch,
  'java-exception-throws':   javaThrows,
  'java-exception-custom':   javaCustomExceptions,

  // Java 8+
  'java-lambda':                javaLambda,
  'java-functional-interfaces': javaFunctionalInterfaces,
  'java-streams':               javaStreams,
  'java-optional':              javaOptional,

  // Multithreading
  'java-threads':            javaThreads,
  'java-runnable':           javaRunnable,
  'java-executor-framework': javaExecutorFramework,
  'java-synchronization':    javaSynchronization,
  'java-completable-future': javaCompletableFuture,

  // Memory Management
  'java-heap-stack':         javaHeapStack,
  'java-garbage-collection': javaGarbageCollection,

  // File Handling
  'java-file-api': javaFileApi,
  'java-nio':      javaNio,

  // Advanced
  'java-generics':               javaGenerics,
  'java-comparable-comparator':  javaComparableComparator,
  'java-serialization':          javaSerialization,
  'java-reflection':             javaReflection,
};
