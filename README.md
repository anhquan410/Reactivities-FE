// 1

- [x] Render List Activities with activities state
- [x] Click on "Create Activity" => open ActivityForm

- [x] In ActivityList, click on "View" => open ActivityDetail + fill data to detail
- [x] In ActivityList, click "Delete" => delete activity on FE

- [x] In ActivityDetail, click "Edit" button => show ActivityForm with select Activity
- [x] In ActivityDetail, click "Cancel" button => cancel ActivityDetail

- [x] In ActivityForm, click "Cancel" button => cancel ActivityForm with select Activity
- [x] In ActivityForm, click "Submit" button => update data

// 2

- [ ] Move all logic to context (useContext)
- [ ] use Reducer to manage complex state (formType, selectedActivity)

// 3
// Authentication flow phía FE

- Gửi req đến server
- server trả về token cho backend => cấp quyền

- Đặc điểm của cookie: ko thể edit, tự động đính kèm vào header khi gửi req (thêm withCredentials: true)

// Khi nào React query refetch data

- khi queryKey changes
- observer mount: khi component mount -> unmount -> mount
- window nhận focus event
  refetchOnMount: false
  refetchOnWindowFocus: false
  refetchOnReconnect: false
- the device goes offline

// Todo

- Trong profile:
  - [x] Phần Header, show data của user
  - [x] Phần About, show data của user,
        Thêm nút Edit => bấm Edit show form to edit => Cancel/Save
  - [x] Phần Photo, show data
        Add Photo, Delete Photo
  - [ ] Phần Following, show data
  - [ ] Phần Follower, show data

// 4

- [ ] Profile Photos:
  - [x] Set main photo (use optimistic update) + update avatar on header
  - [x] Delete photo - can not delete main photo + use optimistic update - API: DELETE /api/profiles/photo/:photoId

// 5

- [x] Implement follow feature: API: POST /api/profiles/:profileId/follow ( check full workflow of follow feature)
- [ ] Create DateTimeInput using react hook form (useController): https://v6.mui.com/x/react-date-pickers/date-time-picker/
- [ ] Validate Login + Register form (zod validation + react hook form to reuse components)
- [x] Complete ActivityForm (Create + Edit)
- [ ] Investigate how to manage state on url (urlSearchParams)


