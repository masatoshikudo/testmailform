-- 1. CamelCase の firstName カラムを削除
ALTER TABLE public.subscribers
  DROP COLUMN IF EXISTS "firstName"; 