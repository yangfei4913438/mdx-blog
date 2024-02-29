import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { usePostData } from '@/store';

const usePostListData = () => {
  const router = useRouter();
  const { setTags, setPostInfos } = usePostData();

  const countOccurrences = (arr: string[]) => {
    if (!arr) return {};

    let occurrences: { [key: string]: number } = {};
    for (let i = 0; i < arr.length; i++) {
      let element = arr[i];
      if (occurrences[element]) {
        occurrences[element]++;
      } else {
        occurrences[element] = 1;
      }
    }
    return occurrences;
  };

  useEffect(() => {
    fetch('/api/postList/' + router.locale)
      .then((res) => res.json())
      .then((res) => {
        setPostInfos(res);
        const allTags = res.map((p: any) => p.tags).flat();
        const countTags = countOccurrences(allTags);
        setTags(countTags);
      });
  }, [router.locale]);

  return null;
};

export default usePostListData;
